
const jwt = require('jsonwebtoken');
require("dotenv").config();


const generateToken = (userId) => {
    const token = jwt.sign({ user: userId }, process.env.MY_SECRET_KEY, {
      subject: 'Sound Design jwtoken',
      expiresIn: '1440m',
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
    generateToken
}