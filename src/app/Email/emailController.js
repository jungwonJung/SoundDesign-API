const {
    confirmEmail
} = require("./emailService")

const emailController = {
    confirm:  async (req, res) => {
        try {
          const { email } = req.query;
          await confirmEmail(email);
          console.log(await confirmEmail(email))
          res.send('<script type="text/javascript">alert("Successfully verified"); window.location="http://localhost:3000"; </script>');
        } catch (error) {
          console.log(error);
          res.status(500).send('Error confirming email');
        }
      },
}

module.exports = emailController