const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Happy Client"
  },
  review: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
