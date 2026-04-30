const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    category: { type: String, default: "Detailing" },
    author: { type: String, default: "Admin" },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
