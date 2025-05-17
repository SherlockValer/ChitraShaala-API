const axios = require("axios");
const AppError = require("../utils/AppError");
const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const setSecureCookies = require("../utils/setSecureCookies");

// load config files
dotenv.config();
const PORT = process.env.PORT || 5000;

// Authorize Client
const authorizeClient = catchAsync(async (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:${PORT}/v1/auth/google/callback&response_type=code&scope=profile email&prompt=select_account`;

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
        redirect_uri: `http://localhost:${PORT}/v1/auth/google/callback`,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    accessToken = tokenResponse.data.access_token;
    setSecureCookies(res, accessToken);
    return res.redirect(`https://kaviopix-api.vercel.app/v1/albums`);
    // ${process.env.FRONTEND_URL}
  } catch (error) {
    console.error(error);
  }
});

// logout
const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("access_token");
  res.send("You are successfully logged out.");
});

module.exports = { authorizeClient, getAccess, logout };
