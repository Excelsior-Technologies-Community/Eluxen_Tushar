const express = require("express");
const router = express.Router();
const FAQ = require("../models/FAQ");

// GET all FAQs sorted by order
router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ADD faq
router.post("/", async (req, res) => {
  try {
    const { question, answer, order } = req.body;
    const faq = new FAQ({ question, answer, order: order || 0 });
    await faq.save();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE faq
router.put("/:id", async (req, res) => {
  try {
    const { question, answer, order } = req.body;
    const updated = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer, order: order || 0 },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE faq
router.delete("/:id", async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
