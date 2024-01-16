const express = require('express');
const soundController = require('./soundController');
const { audioUpload } = require('../../middleware/uploadMiddleware');
const router = express.Router();

// Upload SoundFIle
router.post("/sound", audioUpload, soundController.upload)

// Get Sounds List
router.get("/sound",soundController.getSoundList)

// Get Sounds List(Own)
router.get("/sound/my",soundController.getMySoundList)

// Delete Sound file
router.delete("/sound", soundController.remove)

// router.get("/sound/search", soundController.search)

// router.get("/sound/like", soundController.mylike)

router.get("/sound/:fileName", soundController.filePath)

module.exports = router;