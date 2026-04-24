const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET all testimonials (sorted by order)
router.get("/", async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ order: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ADD testimonial (with optional photo)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";

    const testimonial = new Testimonial({
      name: req.body.name,
      role: req.body.role,
      review: req.body.review,
      image: imageUrl,
      order: req.body.order || 0
    });

    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE testimonial (with optional new photo)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      review: req.body.review,
      order: req.body.order || 0
    };

    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE testimonial
router.delete("/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
