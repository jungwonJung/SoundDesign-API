const express = require("express");
const router = express.Router();
const emailCotroller = require("./emailController");

// Confirm Email
router.get("/email/confirm", emailCotroller.confirm);

module.exports = router;