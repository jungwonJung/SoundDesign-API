const User = require("../../../config/db/models/userModel");

  const confirmEmail = async (email) => {
    try {
      const user = await User.updateOne(
        { accountEmail: email },
        { $set: { isAcceptEmail: true } },
        { new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  };


  module.exports = {
    confirmEmail
  };
  