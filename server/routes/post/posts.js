const express = require("express");
const router = express.Router();

const {
  createPosts,
  getFeedPosts,
  getUserPosts,
  likePosts,
} = require("../../controllers/posts/postsController");
const upload = require("../../storage/storage");
const { verifyToken } = require("../../middleware/auth");

router.post("/posts", verifyToken, upload.single("picture"), createPosts);

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePosts);

module.exports = router;
