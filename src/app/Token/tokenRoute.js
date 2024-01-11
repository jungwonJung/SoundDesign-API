
const express = require("express");
const router = express.Router();
const tokenController = require("./tokenController")

// Token Decode
router.get("/token/test", tokenController.decode)



module.exports = router;
