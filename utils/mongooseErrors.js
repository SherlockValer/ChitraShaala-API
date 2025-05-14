const AppError = require("./AppError");

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const messages = Object.values(err.errors).map((val) => val.message);
  return new AppError(messages.join(","), 400);
}

function handleDuplicateKeyErrorDB(err) {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(
    `Duplicate value for ${field}. Please use another value.`,
    400
  );
}

module.exports = {
  handleCastErrorDB,
  handleValidationErrorDB,
  handleDuplicateKeyErrorDB,
};
