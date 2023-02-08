const express = require("express");
const connection = require("./database/db");
const dotenv = require("dotenv");
const Router = require("./routes/route");

dotenv.config();
const app = express();

app.use("/", Router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

connection(USERNAME, PASSWORD);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
