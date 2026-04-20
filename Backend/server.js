const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const heroRoutes = require("./routes/heroRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/eluxen")

  .then(()=> console.log("DB connected"));

app.use("/api/services", serviceRoutes);
app.use("/api/hero", heroRoutes);;

app.listen(5000, () => console.log("Server running"));