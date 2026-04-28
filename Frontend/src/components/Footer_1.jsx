import React, { useState } from "react";
import "../assets/css/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the Privacy Policy.");
    setSubscribed(true);
    setEmail("");
    setAgreed(false);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* COL 1 — Logo + desc */}
        <div className="footer-col footer-brand">
          <img
            src="https://html.designingmedia.com/eluxen/assets/images/footer-logo.png"
            alt="Eluxen"
            className="footer-logo"
          />
          <p>
            We specialize in premium detailing services for drivers who demand
            perfection. Your car deserves more than clean...
          </p>
        </div>

        {/* COL 2 — Navigation */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/faq">Faq</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
          </ul>
        </div>

        {/* COL 3 — Contact Info */}
        <div className="footer-col">
          <h4>Contact Info</h4>
          <ul>
            <li>
              <a href="tel:+61383766284">+61 3 8376 6284</a>
            </li>
            <li>
              <a href="mailto:info@eluxen.com">info@eluxen.com</a>
            </li>
            <li>551 Swanston Street, Melbourne Victoria 3053 Australia</li>
          </ul>
        </div>

        {/* COL 4 — Newsletter */}
        <div className="footer-col">
          <h4>Newsletter Signup</h4>
          {subscribed ? (
            <p className="subscribed-msg">✅ Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleNewsletter} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                  </svg>
                </button>
              </div>
              <label className="newsletter-check">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  I agree to the <a href="#">Privacy Policy</a>.
                </span>
              </label>
            </form>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>Copyright © 2025 Eluxen. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
