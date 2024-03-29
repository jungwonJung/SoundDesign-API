const path = require('path');

const {
  createUser,
  checkEmail,
  getUserByToken,
  comparePassword,
  findUserIsAccept,
  updateUserProfile
} = require("./userService");

const {
  tokenGenerate,
} = require("../Token/tokenService")

const {sendVerificationEmail} = require("../../middleware/emailMiddleware");
const { processFileUpload } = require("../../middleware/uploadMiddleware");



const userController = {
  create: async (req, res) => {
    const { accountEmail, accountPw, accountName } = req.body;

    if (!accountEmail || !accountPw || !accountName)
      return response.send("should write whole info");

    try {
      if (await checkEmail(accountEmail)) {

        return res.send("already has same email");
      } else {
        const user = await createUser({
          accountEmail,
          accountPw,
          accountName,
        });

        res.send([user]);

        sendVerificationEmail(user.accountEmail)
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  },

  login: async (req, res) => {
    try {
      const { accountEmail, accountPw } = req.body;
  
      if (!accountEmail || !accountPw) {
        return res.status(400).json({ message: "Please provide both email and password." });
      }
  
      const user = await findUserIsAccept(accountEmail, true);
  
      if (!user) {
        return res.status(404).json({ message: "User not found or email not accepted." });
      }
  
      const isPasswordMatch = await comparePassword(accountPw, user.accountPw);
  
      if (isPasswordMatch) {
        const token = tokenGenerate(user._id);
        return res.status(200).json({ token: token.token });
      } else {
        return res.status(401).json({ message: "Incorrect password, login failed." });
      }
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ message: "Internal server error during login." });
    }
  },
  
   get : async (req, res) => {
    try {
      const token = req.headers.token;
  
      if (!token) {
        return res.status(400).json({ message: "Token is missing in the request body." });
      }
      const user = await getUserByToken(token);
  
      if (user) {
        return res.status(200).json({
          _id: user._id,
          accountEmail: user.accountEmail,
          accountName: user.accountName,
          accountImg: user.accountImg
        });
      } else {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
    } catch (error) {
      console.error("Error in get:", error);
      return res.status(500).json({ message: "Internal server error while processing the request." });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const token = req.headers.token;
      const user = await getUserByToken(token);
  
      if (!user) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
  
      const { accountName } = req.body;
      const userImg = req.file

 

      if (!accountName && !userImg) {
        return res.send("7777"); // No updates provided
      }
  
      let filePath = null;
      if (userImg) {
        filePath = await processFileUpload(userImg, false);
      }
  
      const update = await updateUserProfile(user, accountName, filePath);
  
      return res.send(update);
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return res
        .status(500)
        .json({
          message: "Internal server error during profile update.",
        });
    }
  },

  imgPath: async (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve(__dirname, "../../../profiles/" + filename );

    return res.sendFile(filePath)
  }
  
}

module.exports = userController;
