const axios = require("axios");
const AppError = require("../utils/AppError");
const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const setSecureCookies = require("../utils/setSecureCookies");
const User = require("../models/user.model");
const { signToken } = require("../utils/jwt");

// load config files
dotenv.config();
const PORT = process.env.PORT || 5000;

const isDev = process.env.NODE_ENV !== "production";

// Authorize Client
const authorizeClient = catchAsync(async (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=https://chitrashaala-api.vercel.app/v1/auth/google/callback&response_type=code&scope=profile email&prompt=select_account`;

  res.redirect(googleAuthURL);
});

// Get Access Token
const getAccess = catchAsync(async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    return next(new AppError("Authorization code not provided.", 400));
  }

  let accessToken;
  try {
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `https://chitrashaala-api.vercel.app/v1/auth/google/callback`,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    accessToken = tokenResponse.data.access_token;

    // Fetch user info from Google using access token
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const { email, name } = userInfoResponse.data;

    // Check if user exists or create new
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name });
    }

    // Create your own JWT with user ID or email as payload
    const token = signToken({ id: user._id, email: user.email });

    // Set JWT in cookie (secure, httpOnly)
    setSecureCookies(res, token);

    return res.redirect(`${process.env.FRONTEND_URL}`);
  } catch (error) {
    console.error(error);
  }
});

// logout
const logout = catchAsync(async (req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  res.cookie("jwt", "", {
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: !isDev,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "You are successfully logged out.",
  });
});

module.exports = { authorizeClient, getAccess, logout };
