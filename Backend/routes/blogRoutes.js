const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Slug generator
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Make slug unique
const uniqueSlug = async (title) => {
  let slug = generateSlug(title);
  let exists = await Blog.findOne({ slug });
  let counter = 1;
  while (exists) {
    slug = `${generateSlug(title)}-${counter}`;
    exists = await Blog.findOne({ slug });
    counter++;
  }
  return slug;
};

// GET all
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET single by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ADD
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "";
    const slug = await uniqueSlug(req.body.title);
    const blog = new Blog({
      title: req.body.title,
      excerpt: req.body.excerpt || "",
      content: req.body.content || "",
      category: req.body.category || "Detailing",
      author: req.body.author || "Admin",
      image: imageUrl,
      slug,
    });
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error("Blog POST error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author,
    };
    if (req.file) updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Blog PUT error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
