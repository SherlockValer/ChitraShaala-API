const catchAsync = require("../utils/catchAsync");
const Album = require("../models/album.model");
const User = require("../models/user.model");
const { verifyAlbumOwner } = require("../utils/verifyAlbumOwner");
const AppError = require("../utils/AppError");

const getAlbums = catchAsync(async (req, res) => {
  const currentUser = req.user;

  const myAlbums = await Album.find({ ownerId: currentUser._id });
  const sharedAlbums = await Album.find({ sharedUsers: currentUser.email });

  res.status(200).json({
    status: "success",
    myAlbums,
    sharedAlbums,
  });
});

const getOneAlbum = catchAsync(async (req, res) => {
  const { albumId } = req.params;

  verifyAlbumOwner(albumId, req);

  const album = await Album.findById(albumId);

  res.status(200).json({
    status: "success",
    album,
  });
});

const createAlbum = catchAsync(async (req, res) => {
  const currentUser = req.user;
  const { name, description } = req.body;

  const newAlbum = new Album({
    name,
    description,
    ownerId: currentUser._id,
  });

  const saved = await newAlbum.save();

  res.status(201).json({
    status: "success",
    created: saved,
  });
});

// Edit Album
const editAlbum = catchAsync(async (req, res) => {
  const { albumId } = req.params;

  verifyAlbumOwner(albumId, req);

  const updateAlbum = await Album.findByIdAndUpdate(albumId, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    updated: updateAlbum,
  });
});

// Share Album
const shareAlbum = catchAsync(async (req, res, next) => {
  const { albumId } = req.params;
  const { email } = req.body;

  // Verify Album Owner
  verifyAlbumOwner(albumId, req);

  // Check if user already exists in album
  const albumData = await Album.findById(albumId);
  if (albumData.sharedUsers.includes(email)) {
    return next(new AppError("User Already Exists!", 400));
  }

  // Check if user exists in database or not
  const userExistsInDB = await User.findOne({ email });

  if (!userExistsInDB || userExistsInDB._id === albumData.ownerId) {
    return next(new AppError("Invalid Email ID!", 400));
  }

  const shared = await Album.findByIdAndUpdate(
    albumId,
    { $addToSet: { sharedUsers: email } },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    shared,
  });
});

// Remove access to album
const unshareAlbum = catchAsync(async (req, res, next) => {
  const { albumId } = req.params;
  const { email } = req.body;

  // Verify Album Owner
  verifyAlbumOwner(albumId, req);

  // delete user from album
  const unshared = await Album.findByIdAndUpdate(
    albumId,
    { $pull: { sharedUsers: email } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    unshared,
  });
});

const deleteAlbum = catchAsync(async (req, res) => {
  const { albumId } = req.params;

  verifyAlbumOwner(albumId, req);

  const deleted = await Album.findByIdAndDelete(albumId);

  res.status(200).json({
    status: "success",
    deleted,
  });
});

module.exports = {
  getAlbums,
  getOneAlbum,
  createAlbum,
  editAlbum,
  shareAlbum,
  unshareAlbum,
  deleteAlbum,
};
