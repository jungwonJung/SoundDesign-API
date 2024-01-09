const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { validateSignup, validateSignupResult } = require("./userService");

// User Signup
router.post(
  "/user",
  [validateSignup, validateSignupResult],
  userController.create
);

// Confirm Email
router.get("/user/confirm", userController.confirm);

// User Login
router.post("/user/login", userController.login);

// Test Token
router.get("/user/token/test", userController.tokentest);

// Get User Profile Info
router.get("/user/profile", userController.tokenprofile);

// Update User Profile with Token
router.patch("/user/profile/update", userController.updateProfile);

// Get User Profile Image by Filename
router.get("/user/profile/img/:filename", userController.img_path);

module.exports = router;

module.exports = router;
