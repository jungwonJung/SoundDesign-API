const express = require('express');
const soundController = require('./soundController');
const { audioUpload } = require('../../middleware/uploadMiddleware');
const router = express.Router();

router.post("/sound", audioUpload, soundController.upload)

// router.get("/sound",soundController.getsoundlist)

// router.get("/sound/my",soundController.getmysoundlist)

router.delete("/sound", soundController.remove)

// router.get("/sound/search", soundController.search)

// router.get("/sound/like", soundController.mylike)

// router.get("/sound/:fileName", soundController.file_path)

module.exports = router;