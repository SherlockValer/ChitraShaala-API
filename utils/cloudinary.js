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
    if (!localFilePath) throw new AppError("No file path provided", 400);

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "kavioPix",
    });

    // Delete local file after upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    // file has been uploaded successfully
    console.log("✅ file is uploaded on cloudinary", response.secure_url);
    return response;
  } catch (error) {
    // Clean up file if something fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("❌ Cloudinary Upload Error:", error);

    new AppError("Failed to upload image", 500);
  }
};

module.exports = uploadOnCloudinary;
