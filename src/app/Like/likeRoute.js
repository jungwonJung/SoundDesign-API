const express  = require("express");
const router = express.Router()
const {likeController} = require("./likeController")

router.post("/set/like",likeController.like)

module.exports = router;



