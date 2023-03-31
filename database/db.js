const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = async (URL) => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(`DB connection: ${error}`);
  }
};

module.exports = connection;
