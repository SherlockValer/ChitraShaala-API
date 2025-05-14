const catchAsync = require("../utils/catchAsync");
const Image = require("../models/image.model");
const AppError = require("../utils/AppError");
const uploadOnCloudinary = require("../utils/cloudinary");

//! GET

const getImages = catchAsync(async (req, res) => {
  const { albumId } = req.params;

  const images = await Image.find({ albumId });

  res.status(200).json({
    status: "success",
    images,
  });
});

const getFavImages = catchAsync(async (req, res) => {
  const { albumId } = req.params;

  const favImages = await Image.find({ albumId, isFavorite: true });

  res.status(200).json({
    status: "success",
    favImages,
  });
});

const getImagesByTag = catchAsync(async (req, res) => {
  if (!req.query.tags) {
    return next(new AppError("Bad Request", 400));
  }

  const { albumId } = req.params;
  const { tags } = req.query;

  const images = await Image.find({ albumId, tags });

  res.status(200).json({
    status: "success",
    images,
  });
});

//! POST

const uploadImage = catchAsync(async (req, res, next) => {
  console.log(req.file);

  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  const { albumId } = req.params;

  // upload to cloudinary
  const response = await uploadOnCloudinary(req.file.path);

  // save link to mongodb
  const newImage = new Image({
    albumId,
    name: req.file.originalname,
    url: response.secure_url,
  });
  await newImage.save();

  res.status(200).json({
    status: "success",
    imageUrl: response.secure_url,
  });
});

const starImage = catchAsync(async (req, res) => {
  const { imageId } = req.params;
  const { isFavorite } = req.body;

  const starred = await Image.findByIdAndUpdate(
    imageId,
    { isFavorite, updatedAt: new Date() },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    starred,
  });
});

const addComment = catchAsync(async (req, res) => {
  const { imageId } = req.params;
  const { comment } = req.body;

  const commented = await Image.findByIdAndUpdate(
    imageId,
    { comments: comment, updatedAt: new Date() },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    commented,
  });
});

//! DELETE

const deleteImage = catchAsync(async (req, res) => {
  const { imageId } = req.params;

  const deleted = await Image.findByIdAndDelete(imageId);

  res.status(200).json({
    status: "success",
    deleted,
  });
});

module.exports = {
  getImages,
  getFavImages,
  getImagesByTag,
  uploadImage,
  starImage,
  addComment,
  deleteImage,
};
