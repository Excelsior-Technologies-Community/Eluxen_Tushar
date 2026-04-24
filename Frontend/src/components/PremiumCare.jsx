import React from "react";
import ContactButton from "./ContactButton";
import "../assets/css/PremiumCare.css";

const PremiumCare = () => {
  return (
      <div className="premium-care-image">
    <div className="premium-care">

      <div className="premium-care-content">
        <span className="tag">Premium Care</span>
        <h2>Elevate Your Drive with Our <br /> Premium Detailing</h2>
      </div>
      <div className="premium-care-btn">
        <ContactButton
          text="Get a free quote"
          bgColor="#3460fc"
          textColor="#fff"
          iconBg="#000"
          iconColor="#fff"
          hoverColor="#f5b942"
          hoverText="#000"
          />
      </div>
          </div>
    </div>
  );
};

export default PremiumCare;
