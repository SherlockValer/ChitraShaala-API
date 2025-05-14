const catchAsync = require("../utils/catchAsync");
const Album = require("../models/album.model");

const getAlbums = catchAsync(async (req, res) => {
  const albums = await Album.find();

  res.status(200).json({
    status: "success",
    data: albums,
  });
});

const createAlbum = catchAsync(async (req, res) => {
  const { name, description, ownerId } = req.body;

  const newAlbum = new Album({
    name,
    description,
    ownerId: req.users._id,
  });

  const saved = await newAlbum.save();

  res.status(201).json({
    status: "success",
    created: saved,
  });
});

const editAlbum = catchAsync(async (req, res) => {
  const { albumId } = req.params;

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

  const deleted = await Album.findByIdAndDelete(albumId);

  res.status(200).json({
    status: "success",
    deleted,
  });
});

module.exports = { getAlbums, createAlbum, editAlbum, shareAlbum, deleteAlbum };
