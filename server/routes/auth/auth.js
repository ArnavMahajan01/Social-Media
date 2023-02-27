const express = require("express");
const router = express.Router();

const upload = require("../../storage/storage");
const {
  register,
  login,
} = require("../../controllers/accounts/authController");

router.post("/auth/register", upload.single("picture"), register);

router.post("/auth/login", login);

module.exports = router;
