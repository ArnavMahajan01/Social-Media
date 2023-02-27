const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middleware/auth");
const {
  getUser,
  getUserFriends,
  addRemoveFriends,
} = require("../../controllers/user/userController");

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/:friendId", verifyToken, addRemoveFriends);

module.exports = router;
