const Album = require("../models/album.model.js");

export async function removeSharedUsers(album, userId) {
  if (album.ownerId !== userId) {
    const res = await Album.findById(album._id, { sharedUsers: 0 });
    return res;
  }
}
