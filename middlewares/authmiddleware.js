const axios = require("axios");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");

async function protect(req, res, next) {
  if (!req.cookies.access_token) {
    return next(new AppError("Not authorized to access this route", 401));
  }

  try {
    // verify token
    const googleUserDataResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    const { email } = googleUserDataResponse.data;

    const userExists = await User.findOne({
      email,
    });

    // If user not in database, create new
    if (!userExists) {
      const newUser = new User({
        email,
      });

      const saveUser = await newUser.save();
      req.user = saveUser;
      return next();
    }

    req.user = userExists;

    next();
  } catch (error) {
    return next(new AppError("Not authorized to access this route", 401));
  }
}

module.exports = protect;
