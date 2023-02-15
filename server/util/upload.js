const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dotenv = require("dotenv");

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

//gridFsStorage is treated as function and accept muliple arguments

const storage = new GridFsStorage({
  url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.yk9wmgn.mongodb.net/?retryWrites=true&w=majority`,
  option: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()} -blog- ${file.orignalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.orignalname}`,
    };
  },
});

module.exports = multer({ storage });
