const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
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


// ✅ GET all services
router.get("/", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});


// ✅ ADD service (with image)
router.post("/", upload.single("image"), async (req, res) => {
  const imageUrl = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";

 const service = new Service({
  number: req.body.number,
  title: req.body.title,
  description: req.body.description,
  image: imageUrl   // ✅ correct
});

  await service.save();
  res.json(service);
});


// ✅ UPDATE service (with image optional)
router.put("/:id", upload.single("image"), async (req, res) => {
  let updateData = {
    title: req.body.title,
    description: req.body.description
  };

if (req.file) {
  updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
}

  const updated = await Service.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});


// ✅ DELETE service
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;