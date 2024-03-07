const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const { mongoDB } = require("./config/db/db.js");
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./src/app/User/userRoute"));
app.use("/api", require("./src/app/Email/emailRoute"));
app.use("/api", require("./src/app/Token/tokenRoute"));
app.use("/api", require("./src/app/Sound/soundRoute"));
// app.use("/api", require("./routes/like_routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Sound Design API Docs",
      version: "1.0",
      description:
        "For communication with who want using Sound Design Open API",
    },
  },
  apis: ["./src/docs/swagger.js"],
  schemas: ["http", "https"],
};

const specs = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoDB();

module.exports = app;
