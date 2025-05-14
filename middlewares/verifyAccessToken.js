const AppError = require("../utils/AppError");

const verifyAccessToken = (req, res, next) => {
  if (!req.cookies.access_token) {
    return next(new AppError("Access denied", 403));
  }

  next();
};

module.exports = { verifyAccessToken };
