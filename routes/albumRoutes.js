const express = require("express");
const {
  getAlbums,
  createAlbum,
  editAlbum,
  shareAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

const {
  getImages,
  getFavImages,
  getImagesByTag,
  uploadImage,
  starImage,
  addComment,
  deleteImage,
} = require("../controllers/imageController");
const upload = require("../middlewares/multer");
const router = express.Router();

//? Albums

router.get("/", getAlbums);

router.post("/", createAlbum);

router.post("/:albumId", editAlbum);

router.post("/:albumId/share", shareAlbum);

router.delete("/:albumId", deleteAlbum);

//? Images

router.get("/:albumId/images", getImages);

router.get("/:albumId/images/favorites", getFavImages);

router.get("/:albumId/images", getImagesByTag);

router.post("/:albumId/images", upload.single("image"), uploadImage);

router.post("/:albumId/images/:imageId/favorite", starImage);

router.post("/:albumId/images/:imageId/comments", addComment);

router.post("/:albumId/images/:imageId", deleteImage);

module.exports = router;
