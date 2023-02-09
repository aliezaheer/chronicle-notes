const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = async (USERNAME, PASSWORD) => {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.yk9wmgn.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(`DB connection: ${error}`);
  }
};

module.exports = connection;
