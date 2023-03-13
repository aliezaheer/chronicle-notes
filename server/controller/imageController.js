const gridFsStream = require("gridfs-stream");
const mongoose = require("mongoose");

const url = "";

let gfs, gridFsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = gridFsStream(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ msg: "Imgage file not found" });
  }
  const imageUrl = `${url}/file/${req.file.filename}`;

  return res.status(200).json(imageUrl);
};

exports.getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
