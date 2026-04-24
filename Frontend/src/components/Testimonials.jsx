import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!testimonials.length) return null;

  const current = testimonials[active];

  return (
    <div className="testimonials-section">
      <span className="tag">Testimonials</span>
      <h2>What Our Clients are Saying About Us.</h2>

      <div className="testimonials-wrapper">
        <div className="testimonial-card">
          <img
            src="https://html.designingmedia.com/eluxen/assets/images/inverted.png"
            alt="quote"
            className="quote-icon"
          />
          <div className="testimonial-content">

          <p className="review-text">{current.review}</p>

          <div className="reviewer-info">
            {current.image ? (
              <img src={current.image} alt={current.name} className="reviewer-img" />
            ) : (
              <div className="reviewer-placeholder">
                {current.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h5>{current.name}</h5>
              <span>{current.role}</span>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="dots">
            {testimonials.map((_, i) => (
              <button
              key={i}
              className={`dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              />
            ))}
            </div>
          </div>
        </div>

        <div className="testimonials-img-side">
          <img
            src="https://html.designingmedia.com/eluxen/assets/images/testimonials-img.jpg"
            alt="testimonials"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
