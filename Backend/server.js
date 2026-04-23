const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const heroRoutes = require("./routes/heroRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const aboutRoutes = require("./routes/aboutUsRoutes");
const pricingRoutes = require("./routes/pricingRoutes"); // ✅ NEW

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/eluxen")
  .then(() => console.log("DB connected"));

app.use("/api/services", serviceRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/pricing", pricingRoutes); // ✅ NEW

app.listen(5000, () => console.log("Server running on port 5000"));
