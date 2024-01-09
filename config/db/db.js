const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });

exports.mongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected"))
    .catch(() => console.log("mongodb connection failed"));
};
