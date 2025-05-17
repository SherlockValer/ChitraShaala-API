const {
  handleCastErrorDB,
  handleValidationErrorDB,
  handleDuplicateKeyErrorDB,
} = require("../utils/mongooseErrors");

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err.stack || err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log(err);
    let error = {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      status: err.status,
      isOperational: err.isOperational,
      stack: err.stack,
      errors: err.errors,
      path: err.path,
      value: err.value,
      keyValue: err.keyValue,
    };

    console.log(error);

    //! Mongoose errors
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.code === 11000) error = handleDuplicateKeyErrorDB(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
