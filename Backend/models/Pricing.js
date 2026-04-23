const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Pricing", pricingSchema);
