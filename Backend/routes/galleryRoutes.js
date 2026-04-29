const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* GET */
router.get("/", async (req, res) => {
  const data = await Gallery.find().sort({ order: 1 });
  res.json(data);
});

/* POST */
router.post("/", upload.single("image"), async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

  const item = new Gallery({
    image: imageUrl,
    order: req.body.order || 0
  });

  await item.save();
  res.json(item);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
// Reorder images
router.put("/reorder", async (req, res) => {
  try {
    const { items } = req.body; // [{_id, order}]

    for (let item of items) {
      await Gallery.findByIdAndUpdate(item._id, { order: item.order });
    }

    res.json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;