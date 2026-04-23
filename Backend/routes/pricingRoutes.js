const express = require("express");
const router = express.Router();
const Pricing = require("../models/Pricing");

// ✅ GET all pricing plans (sorted by order)
router.get("/", async (req, res) => {
  try {
    const plans = await Pricing.find().sort({ order: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET single plan
router.get("/:id", async (req, res) => {
  try {
    const plan = await Pricing.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ CREATE plan
router.post("/", async (req, res) => {
  try {
    const { planName, tagline, price, features, isPopular, order } = req.body;
    const plan = new Pricing({ planName, tagline, price, features, isPopular, order });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ UPDATE plan
router.put("/:id", async (req, res) => {
  try {
    const { planName, tagline, price, features, isPopular, order } = req.body;
    const updated = await Pricing.findByIdAndUpdate(
      req.params.id,
      { planName, tagline, price, features, isPopular, order },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE plan
router.delete("/:id", async (req, res) => {
  try {
    await Pricing.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
