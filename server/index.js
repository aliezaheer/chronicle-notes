const express = require("express");
const connection = require("./database/db");
const dotenv = require("dotenv");
const Router = require("./routes/route");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

connection(USERNAME, PASSWORD);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
