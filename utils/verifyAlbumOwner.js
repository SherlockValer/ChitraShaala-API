async function verifyAlbumOwner() {
  const { ownerId } = await Album.findById(albumId);
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
