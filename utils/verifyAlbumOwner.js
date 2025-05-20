const Album = require("../models/album.model");

async function verifyAlbumOwner(id) {
  const { ownerId } = await Album.findById(id);
  if (ownerId !== req.user._id) {
    return next(
      new AppError(
        "Forbidden. Access to this resource on the server is denied!",
        403
      )
    );
  }
}

module.exports = { verifyAlbumOwner };
