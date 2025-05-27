const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// get user details
const getUser = catchAsync(async (req, res) => {
  if (!req.user) {
    return next(new AppError("Not authorized to access this route", 401));
  }

  const user = req.user;

  res.status(200).json({
    user,
  });
});

module.exports = { getUser };
