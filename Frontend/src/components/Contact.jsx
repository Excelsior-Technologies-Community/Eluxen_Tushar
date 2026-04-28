import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Contact.css";

const initForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initForm);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm(initForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="contact-bg">
      <div className="contact-section">
        {/* LEFT — heading + form */}
        <div className="contact-left">
          <span className="tag">Get in Touch</span>
          <h2>
            Let's Connect <br />
            Reach <br />
            Out to Our Team
          </h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-row">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select Service</option>
                <option value="Car Wash">Car Wash</option>
                <option value="Car Painting">Car Painting</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Interior Detailing">Interior Detailing</option>
                <option value="Exterior Detailing">Exterior Detailing</option>
                <option value="Full Detailing">Full Detailing</option>
              </select>
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              required
            />

            <button
              type="submit"
              className="contact-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <span className="btn-icon">
                <img
                  src="https://html.designingmedia.com/eluxen/assets/images/up-right-arrow.png"
                  alt="arrow"
                />
              </span>
            </button>

            {status === "success" && (
              <p className="form-msg success">
                ✅ Message sent! We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="form-msg error">
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* RIGHT — full height image */}
        <div className="contact-right">
          <img
            src="https://html.designingmedia.com/eluxen/assets/images/send-us-img.jpg"
            alt="detailing"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
