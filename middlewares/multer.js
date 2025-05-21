const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");
const os = require("os");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Configure upload limits
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
  fileFilter: (req, file, cb) => {
    // Check file types
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      new AppError(
        "Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.",
        400
      )
    );
  },
});

module.exports = upload;
