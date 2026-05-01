const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const heroRoutes = require("./routes/heroRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const aboutRoutes = require("./routes/aboutUsRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const faqRoutes = require("./routes/faqRoutes");
const contactRoutes = require("./routes/contactRoutes");
const pageHeroRoutes = require("./routes/pageHeroRoutes");
const teamRoutes = require("./routes/teamRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/eluxen")
  .then(() => console.log("DB connected"));

  app.use("/api/auth", authRoutes);

app.use("/api/services", serviceRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/page-hero", pageHeroRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);


// ─── PROTECTED ADMIN ROUTES ───────────────────────────────────────────────────
app.use("/api/admin/services", authMiddleware, serviceRoutes);
app.use("/api/admin/hero", authMiddleware, heroRoutes);
app.use("/api/admin/about", authMiddleware, aboutRoutes);
app.use("/api/admin/pricing", authMiddleware, pricingRoutes);
app.use("/api/admin/testimonials", authMiddleware, testimonialRoutes);
app.use("/api/admin/faqs", authMiddleware, faqRoutes);
app.use("/api/admin/contact", authMiddleware, contactRoutes);
app.use("/api/admin/page-hero", authMiddleware, pageHeroRoutes);
app.use("/api/admin/team", authMiddleware, teamRoutes);
app.use("/api/admin/gallery", authMiddleware, galleryRoutes);
app.use("/api/admin/blogs", authMiddleware, blogRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
