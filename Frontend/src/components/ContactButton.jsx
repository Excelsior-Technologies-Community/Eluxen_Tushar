import React, { useState } from "react";

const ContactButton = ({
  text = "Contact",
  bgColor = "#facc15",
  textColor = "#000",
  iconBg = "#000",
  iconColor = "#fff",
  hoverColor = "#3460fc",
  hoverText = "#fff",
  onClick
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        background: hover ? hoverColor : bgColor,
        color:  hover ? hoverText : textColor,
        padding: "18px 30px",
        paddingRight: "60px",
        borderRadius: "10px",
        border: "none",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        fontWeight: "600",
        position: "relative",
        fontSize: "16px",
         transition: "all 0.8s ease",
      }}
    >
      {text}
      <span
        style={{
          background: iconBg,
          color: iconColor,
          padding: "12px 15px",
          borderRadius: "6px",
            position: "absolute",
            right: "5px",
            
        }}
      >
        <img src="https://html.designingmedia.com/eluxen/assets/images/up-right-arrow.png" alt="" />
      </span>
    </button>
  );
};

export default ContactButton;