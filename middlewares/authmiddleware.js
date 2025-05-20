const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");

async function protect(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("Not authorized to access this route", 401));
  }

  try {
    // Verify your own JWT
    const decoded = verifyToken(token);

    // Find user by ID in token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Not authorized to access this route", 401));
  }
}

module.exports = protect;
