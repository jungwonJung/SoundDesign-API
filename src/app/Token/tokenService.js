
const jwt = require('jsonwebtoken');
const { TOKEN_SUBJECT, TOKEN_EXPRIE_TIME } = require('../../../config/config');
require("dotenv").config();


const tokenGenerate = (userId) => {
    const token = jwt.sign({ user: userId }, process.env.MY_SECRET_KEY, {
      subject: TOKEN_SUBJECT,
      expiresIn: TOKEN_EXPRIE_TIME,
    });
    
    return {token : token};
  };

const tokenDecode = async (token) => {
     const info = await jwt.verify(token, process.env.MY_SECRET_KEY);
     return {
        _id : info.user
     }
}

module.exports = {
    tokenDecode,
    tokenGenerate
}