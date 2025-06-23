export function removeSharedUsers(album, userId) {
  if (album.ownerId !== userId) {
    const { sharedUsers, ...newObject } = album;
    return newObject;
  }
}
