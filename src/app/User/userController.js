const User = require("../../../config/db/user_model");
const {
  createUser,
  checkEmail,
  loginUser,
  comparePasswordAndGenerateToken,
} = require("./userService");

// const nodemailer = require("nodemailer"); //

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "bodercoding@gmail.com",
//     pass: "your-gmail-password",
//   },
// });

const userController = {
  create: async (req, res) => {
    const { accountEmail, accountPw, accountName } = req.body;

    console.log(req.body);

    if (!accountEmail || !accountPw || !accountName)
      return response.send("should write whole info");

    try {
      if (checkEmail(accountEmail)) {
        return res.send("already has same email");
      } else {
        const user = await createUser({
          accountEmail,
          accountPw,
          accountName,
        });

        res.send([user]);

        // var mailOption = {
        //   from: "bodercoding@gmail.com",
        //   to: user.accountEmail,
        //   subject: "이메일 인증해주세요",
        //   html:
        //     "<p>아래의 링크를 클릭해서 인증해주세요!</p>" +
        //     "<a href='https://jungganzi.xyz/api/confirm/account" +
        //     "?email=" +
        //     user.accountEmail +
        //     " '>인증하기</a>",
        // };
        // transporter.sendMail(mailOption, function (err, res) {
        //   // 메일 발송
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log("이메일발송성공");
        //   }
        //   transporter.close();
        // });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  },
  confirm: (req, res) => {},
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
