const express = require("express");
const router = express.Router();
const PageHero = require("../models/PageHero.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all page heroes (for admin list)
router.get("/", async (req, res) => {
  try {
    const data = await PageHero.find().sort({ page: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET single page hero by page name — used by frontend
// e.g. GET /api/page-hero/about
router.get("/:page", async (req, res) => {
  try {
    const data = await PageHero.findOne({ page: req.params.page.toLowerCase() });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE or UPDATE page hero (upsert by page name)
router.post("/", upload.single("bgImage"), async (req, res) => {
  try {
    const { page, title, subtitle } = req.body;
    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : req.body.existingImage || "";

    const hero = await PageHero.findOneAndUpdate(
      { page: page.toLowerCase() },
      { page: page.toLowerCase(), title, subtitle, bgImage: imageUrl },
      { upsert: true, new: true }
    );

    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE page hero
router.delete("/:id", async (req, res) => {
  try {
    await PageHero.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
