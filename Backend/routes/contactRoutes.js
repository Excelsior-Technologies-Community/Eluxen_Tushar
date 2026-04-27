const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact.js");
const nodemailer = require("nodemailer");

// ─── Nodemailer transporter ───────────────────────

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,   
  },
});

// ─── POST /api/contact — form submit ─────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // 1. DB mein save karo
    const contact = new Contact({ name, email, phone, service, message });
    await contact.save();

    // 2. Admin ko email bhejo
    await transporter.sendMail({
      from: `"Eluxen Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,   
      subject: `New Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse; width:100%">
          <tr><td style="padding:8px; border:1px solid #ddd"><b>Name</b></td><td style="padding:8px; border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd"><b>Email</b></td><td style="padding:8px; border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd"><b>Phone</b></td><td style="padding:8px; border:1px solid #ddd">${phone || "—"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd"><b>Service</b></td><td style="padding:8px; border:1px solid #ddd">${service || "—"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd"><b>Message</b></td><td style="padding:8px; border:1px solid #ddd">${message}</td></tr>
        </table>
      `,
    });

    // 3. User ko confirmation email bhejo
    await transporter.sendMail({
      from: `"Eluxen Detailing" <${process.env.EMAIL_USER}>`, 
      to: email,
      subject: "We received your message!",
      html: `
        <h2>Hi ${name}, thank you for contacting us!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p><b>Your message:</b> ${message}</p>
        <br/>
        <p>— Eluxen Detailing Team</p>
      `,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// ─── GET /api/contact — admin ke liye saari inquiries ──────────────────────
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ─── PUT /api/contact/:id — status update (new → read → replied) ─────────────
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ─── DELETE /api/contact/:id ─────────────────
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
