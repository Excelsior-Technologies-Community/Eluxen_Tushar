import React, { useState } from "react";
import "../assets/css/Navbar.css";
import ContactButton from "./ContactButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">

        {/* LEFT LOGO */}
        <div className="logo">
          <span className="car">
            <img src="https://html.designingmedia.com/eluxen/assets/images/logo.png" alt="" />
          </span>
        </div>

        {/* RIGHT SIDE - Desktop */}
        <div className="right">
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

          <ContactButton text="Contact us" bgColor="#f5b942" />

          <div className="phone">
            <img src="https://html.designingmedia.com/eluxen/assets/images/phone-icon.png" alt="" />
            +5689 2589 6325
          </div>
        </div>

        {/* HAMBURGER - Mobile only */}
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        <ul>
          <li onClick={() => setMenuOpen(false)}>Home</li>
          <li onClick={() => setMenuOpen(false)}>About</li>
          <li onClick={() => setMenuOpen(false)}>Services</li>
          <li onClick={() => setMenuOpen(false)}>Pricing</li>
          <li onClick={() => setMenuOpen(false)}>Blog</li>
          <li onClick={() => setMenuOpen(false)}>Contact</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
