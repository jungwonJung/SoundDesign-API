const { check, validationResult } = require("express-validator");

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

module.exports = { validateSignup, validateSignupResult };
