const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero");

// GET hero data
router.get("/", async (req, res) => {
  const data = await Hero.findOne();
  res.json(data);
});

module.exports = router;