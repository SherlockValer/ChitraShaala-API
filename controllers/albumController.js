const catchAsync = require("../utils/catchAsync");
const Album = require("../models/album.model");
const { verifyAlbumOwner } = require("../utils/verifyAlbumOwner");

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

const shareAlbum = catchAsync(async (req, res) => {
  const { albumId } = req.params;

  verifyAlbumOwner(albumId, req);

  const shared = await Album.findByIdAndUpdate(albumId, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    shared,
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

module.exports = { getAlbums, createAlbum, editAlbum, shareAlbum, deleteAlbum };
