const mongoose = require("mongoose");

const pageHeroSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true, // ek page ka sirf ek hero hoga
    lowercase: true,
    // e.g. "about", "services", "pricing", "contact", "faq"
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  bgImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("PageHero", pageHeroSchema);
