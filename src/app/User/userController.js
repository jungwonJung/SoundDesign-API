const User = require("../../../config/db/user_model");
const {
  createUser,
  checkEmail,
  loginUser,
  comparePasswordAndGenerateToken,
  confirmEmail
} = require("./userService");

const {sendVerificationEmail} = require("../../middleware/emailMiddleware")


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
  confirm:  async (req, res) => {
    try {
      const { email } = req.query;
      await confirmEmail(email);
      res.send('<script type="text/javascript">alert("Successfully verified"); window.location="http://localhost:3000"; </script>');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error confirming email');
    }
  },
  login: async (req, res) => {
    const { accountEmail, accountPw } = req.body;
    if (!accountEmail || !accountPw)
      return res.send("should write with whole info");

    const user = await loginUser(accountEmail, true);
    if (user) {
      try {
        const tokenData = await comparePasswordAndGenerateToken(
          accountPw,
          user.accountPw,
          user._id,
          accountEmail,
          user.accountName
        );

        res.status(200).json({ token: tokenData.token });
      } catch (error) {
        console.error(
          `Error during password comparison and token generation: ${error.message}`
        );
        res.status(500).json({ message: "Internal server error." });
      }
    } else {
      res.send("different email or something wrong");
    }
  },
  tokentest: (req, res) => {},
  tokenprofile: (req, res) => {},
  updateProfile: (req, res) => {},
  img_path: (req, res) => {},
};

module.exports = userController;
