import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Pricing.css";
import ContactButton from "./ContactButton";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pricing")
      .then((res) => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p style={{ color: "#fff", textAlign: "center", padding: "60px" }}>
        Loading...
      </p>
    );

  return (
    <div className="pricing-section">
      <span>Affordable Pricing</span>
      <h1>
        Transparent Pricing Plans
        <br />
        Exceptional Service
      </h1>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`pricing-card ${plan.isPopular ? "popular" : ""}`}
          >
            {plan.isPopular && (
              <div className="popular-badge">Most Popular</div>
            )}

            <h3>{plan.planName}</h3>
            <p className="tagline">{plan.tagline}</p>

            <div className="price-row">
              <div>
                <span className="starting">
                  Starting at: <br />
                </span>
                <span className="dollar">$</span>
                <span className="amount">
                  {plan.price} <br />
                </span>
              </div>
              <span className="period">/Visit</span>
            </div>

            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <a href="#" className="pricing-btn">
              <ContactButton
                text="Get started"
                bgColor="#3460fc"
                textColor="#fff"
                hoverColor="#f5b942"
                hoverText="#000"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
