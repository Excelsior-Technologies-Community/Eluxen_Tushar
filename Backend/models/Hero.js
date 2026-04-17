const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  bgImage: String
});

module.exports = mongoose.model("Hero", heroSchema);