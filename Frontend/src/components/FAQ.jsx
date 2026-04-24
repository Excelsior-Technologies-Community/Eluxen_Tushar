import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/FAQ.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/faqs")
      .then((res) => setFaqs(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!faqs.length) return null;

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-section">
      <div className="faq-right">

      <span className="tag">FAQ's</span>
      <h2>Your Most Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div
          key={faq._id}
          className={`faq-item ${openIndex === i ? "open" : ""}`}
          >
            <button className="faq-question" onClick={() => toggle(i)}>
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === i ? "−" : "+"}</span>
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
        </div>
    </div>
  );
};

export default FAQ;
