import React, { useState } from "react";
import "../assets/css/Navbar.css";
import ContactButton from "./ContactButton";


const Navbar = () => {
  return (
    <header className="navbar">
      
      {/* LEFT LOGO */}
      <div className="logo">
        <span className="car"><img src="https://html.designingmedia.com/eluxen/assets/images/logo.png" alt="" /></span>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
      {/* CENTER MENU */}
      <div className="menu-box">
        <ul>
          <li className="active">Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Pages ▾</li>
          <li>Pricing</li>
          <li>Blog ▾</li>
        </ul>
      </div>

        <ContactButton 
  text="Contact us" 
  bgColor="#f5b942" 
/>



        <div className="phone">
          <img src="https://html.designingmedia.com/eluxen/assets/images/phone-icon.png" alt="" /> +5689 2589 6325
        </div>
      </div>

    </header>
  );
};

export default Navbar;