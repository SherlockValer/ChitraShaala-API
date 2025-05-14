const AppError = require("./AppError");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return new AppError("Something went wrong", 500);

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "kavioPix",
    });

    // file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    console.log("file is uploaded on cloudinary", response.secure_url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    new AppError("Failed to upload image", 500);
  }
};

module.exports = uploadOnCloudinary;
