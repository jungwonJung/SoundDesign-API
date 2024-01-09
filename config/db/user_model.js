const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  accountEmail: {
    type: String,
    required: true,
  },
  accountPw: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  isAcceptEmail: {
    type: Boolean,
    default: false,
  },
  isExit: {
    type: Boolean,
    default: false,
  },
  accountImg: {
    type: String,
  },
  created: {
    type: Number,
  },
  updated: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("accountPw")) {
    return next();
  } else {
    user.accountPw = bcrypt.hashSync(user.accountPw);
    return next();
  }
});

mongoose.model("User", userSchema);
module.exports = mongoose.model("User");
