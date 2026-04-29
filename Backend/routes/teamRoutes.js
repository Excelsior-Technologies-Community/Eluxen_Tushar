const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const data = await Team.find().sort({ order: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "";
    const member = new Team({
      name: req.body.name,
      role: req.body.role,
      facebook: req.body.facebook || "",
      instagram: req.body.instagram || "",
      linkedin: req.body.linkedin || "",
      image: imageUrl,
      order: req.body.order || 0,
    });
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      facebook: req.body.facebook || "",
      instagram: req.body.instagram || "",
      linkedin: req.body.linkedin || "",
      order: req.body.order || 0,
    };
    if (req.file) updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    const updated = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
