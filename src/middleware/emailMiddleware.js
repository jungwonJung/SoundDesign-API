const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_INFO,
    pass: process.env.EMAIL_KEY,
  },
});

const sendVerificationEmail = (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_INFO,
    to: toEmail,
    subject: "Please verify your email",
    html:
      "<p>Please click the link below to authenticate</p>" +
      "<a href='https://sdesign-api-jayganzi.koyeb.app/api/email/confirm" +
      "?email=" +
      toEmail +
      " '>Verify</a>",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully :", info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
};
