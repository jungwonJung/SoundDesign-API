const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { validateSignup, validateSignupResult } = require("./userService");
const { upload } = require("../../middleware/uploadMiddleware");

// User Signup
router.post(
  "/user",
  [validateSignup, validateSignupResult],
  userController.create
);

// User Login
router.post("/user/login", userController.login);

// Get User Profile Info
router.get("/user/profile", userController.get);

// Update User Profile with Token
router.patch("/user/profile", upload, userController.updateProfile);

// Get User Profile Image by Filename
router.get("/user/profile/img/:filename", userController.img_path);

module.exports = router;


