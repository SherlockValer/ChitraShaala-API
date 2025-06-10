const Album = require("../models/album.model");
const AppError = require("./AppError");

async function verifyAlbumOwner(id, req) {
  const { ownerId } = await Album.findById(id);
  if (ownerId !== req.user._id) {
    throw new AppError(
      "Forbidden. Access to this resource on the server is denied!",
      403
    );
  }
}

module.exports = { verifyAlbumOwner };
