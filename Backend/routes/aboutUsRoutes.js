const express = require("express");
const router = express.Router();
const About = require("../models/aboutUsModel");
const upload = require("../middleware/upload");


// ✅ GET About (for frontend display)
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ UPDATE About (with images)
router.post(
  "/update",
  upload.array("images", 3),
  async (req, res) => {
    try {
      const { title, subtitle, description, buttonText } = req.body;

      const imagePaths = req.files
        ? req.files.map(file => "/uploads/" + file.filename)
        : [];

      let about = await About.findOne();

      if (!about) {
        about = new About({
          title,
          subtitle,
          description,
          buttonText,
          images: imagePaths
        });
      } else {
        about.title = title;
        about.subtitle = subtitle;
        about.description = description;
        about.buttonText = buttonText;

        if (imagePaths.length > 0) {
          about.images = imagePaths;
        }
      }

      await about.save();
      res.json(about);

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;