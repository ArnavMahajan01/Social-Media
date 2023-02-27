const express = require("express");
const router = express.Router();

router.use("/", require("./auth/auth"));
router.use("/users", require("./user/user"));
router.use("/posts", require("./post/posts"));

module.exports = router;
