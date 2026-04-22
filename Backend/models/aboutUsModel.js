const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  points: [String],
  images: [String], // 3 images
  buttonText: String
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);