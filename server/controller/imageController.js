exports.uploadImage = async (req, res) => {
  const url = "http://localhost:8000";
  if (!req.file) {
    return res.status(404).json({ msg: "Imgage file not found" });
  }
  const imageUrl = `${url}/file/${req.file.filename}`;

  return res.status(200).json(imageUrl);
};
