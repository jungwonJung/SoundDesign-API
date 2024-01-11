const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../../config/db/user_model");

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

const loginUser = async ({ accountEmail, isAcceptEmail }) => {
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
      const decodedToken =  tokenDecode(token)
      if (decodedToken) {
          const user = await User.findOne({ _id: decodedToken.user });
          return user;
      } else {
          return null;
      }
  } catch (error) {
      throw error;
  }
}


const comparePasswordAndGenerateToken = async (
  enteredPassword,
  storedPassword,
  userId,
  email,
  accountName
) => {
  try {
    const passwordMatch = await bcrypt.compare(enteredPassword, storedPassword);

    if (passwordMatch) {
      const token = jwt.sign({ user: userId }, process.env.MY_SECRET_KEY, {
        subject: "Sound Design jwtoken",
        expiresIn: "1440m",
      });

      return await {
        token,
        accountEmail: email,
        accountName,
        accountId: userId,
      };
    } else {
      throw new Error("Password does not match.");
    }
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
  loginUser,
  checkEmail,
  createUser,
  validateSignup,
  getUserByToken,
  validateSignupResult,
  comparePasswordAndGenerateToken,
};
