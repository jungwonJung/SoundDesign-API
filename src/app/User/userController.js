const User = require("../../../config/db/user_model");
// const nodemailer = require("nodemailer"); // nodemailer를 import한 부분이 없어서 추가

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

    const user = new User();

    // if (checkUser)
    //     return response.send("3588")

    user.accountEmail = accountEmail;
    user.accountPw = accountPw;
    user.accountName = accountName;
    user.created = Date.now();
    user.updated = Date.now();

    if (!accountEmail || !accountPw || !accountName)
      return response.send("9176"); // message: "모든 항목입력주세요"

    try {
      const existingUser = await User.findOne({ accountEmail: accountEmail });

      if (existingUser) {
        return res.send("3588");
      } else {
        await user.save();
        res.send([user]);

        // 회원가입과 동시에 가입 이메일로 메일 전송 user_models 에 Schema.pre 설정함
        // var mailOption = {
        //   // 메일 옵션  설정
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
  login: (req, res) => {},
  tokentest: (req, res) => {},
  tokenprofile: (req, res) => {},
  updateProfile: (req, res) => {},
  img_path: (req, res) => {},
};

module.exports = userController;
