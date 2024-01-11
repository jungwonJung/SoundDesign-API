
const jwt = require('jsonwebtoken');
require("dotenv").config();

const tokenDecode = async (token) => {
     const info = await jwt.verify(token, process.env.MY_SECRET_KEY);
     return {
        _id : info.user
     }
}

module.exports = {
    tokenDecode
}