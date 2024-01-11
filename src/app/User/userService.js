const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../../../config/db/models/userModel");
const { tokenDecode } = require("../Token/tokenService");


const createUser = async ({ accountEmail, accountPw, accountName }) => {
  const user = new User({
    accountEmail,
    accountPw,
    accountName,
    created: Date.now(),
    updated: Date.now(),
  });

  return user.save();
};

const findUserIsAccept = async ({ accountEmail, isAcceptEmail }) => {
  return await User.findOne(accountEmail, isAcceptEmail);
};

const checkEmail = async ( accountEmail ) => {
  try {
    const user = await User.findOne({ accountEmail:accountEmail });
    return user;
  } catch (error) {
    console.error("Something wrong with check Email", error);
    throw error; 
  }
};

const getUserByToken = async (token) => {
  try {
      const decodedToken = await tokenDecode(token)
      console.log(decodedToken)
      if (decodedToken) {
          const user = await User.findOne({ _id: decodedToken._id });
          return user;
      } else {
          return null;
      }
  } catch (error) {
      throw error;
  }
}


const comparePassword = async (enteredPassword, storedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(enteredPassword, storedPassword);
    return passwordMatch;
  } catch (error) {
    throw new Error(`Error comparing passwords: ${error.message}`);
  }
};


const validateSignup = [
  check("accountEmail").isEmail().withMessage("Wrong Email Address"),
  check("accountPw")
    .isLength({ min: 6, max: 15 })
    .matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
    .withMessage(
      "Please set a password with a minimum of 6 characters and a maximum of 15 characters."
    ),
];

const validateSignupResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); // Log validation errors
    res.send("Validation failed. Check the request body.");
  } else {
    next();
  }
};

module.exports = {
  findUserIsAccept,
  checkEmail,
  createUser,
  validateSignup,
  getUserByToken,
  comparePassword,
  validateSignupResult,

};
