const mongoose = require("mongoose");
require("dotenv").config();

exports.mongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected"))
    .catch(() => console.log("mongodb connection failed"));
};
