const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero");

const multer = require("multer");
const path = require("path");

// 🔥 Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// GET hero
router.get("/", async (req, res) => {
  const data = await Hero.findOne();
  res.json(data);
});


// CREATE / UPDATE hero
router.post("/", upload.single("image"), async (req, res) => {
  let hero = await Hero.findOne();

  const imageUrl = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";

  const updateData = {
    title: req.body.title,
    subtitle: req.body.subtitle,
  };

  if (imageUrl) {
    updateData.bgImage = imageUrl;
  }

  if (hero) {
    hero = await Hero.findByIdAndUpdate(
      hero._id,
      updateData,
      { returnDocument: "after" }
    );
  } else {
    hero = new Hero(updateData);
    await hero.save();
  }

  res.json(hero);
});

module.exports = router;