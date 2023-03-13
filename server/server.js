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

if (process.env.Node_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const URL =
  process.env.MONGODB_URI ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.yk9wmgn.mongodb.net/?retryWrites=true&w=majority`;

connection(URL);
