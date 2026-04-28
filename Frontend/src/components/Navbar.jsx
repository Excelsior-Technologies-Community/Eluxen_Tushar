import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Navbar.css";
import ContactButton from "./ContactButton";

const pagesLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "FAQ's", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
];

const blogLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Single Blog", href: "/single-blog" },
  { label: "One Column", href: "/one-column" },
  { label: "Two Column", href: "/two-column" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  const pagesRef = useRef(null);
  const blogRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target)) setPagesOpen(false);
      if (blogRef.current && !blogRef.current.contains(e.target)) setBlogOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header className="navbar">

        {/* LOGO */}
        <div className="logo">
          <img src="https://html.designingmedia.com/eluxen/assets/images/logo.png" alt="Eluxen" />
        </div>

        {/* CENTER MENU */}
        <div className="centerDom">

        <div className="menu-box">
          <ul>
            <li className="active"><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>

            {/* Pages dropdown */}
            <li
              className="has-dropdown"
              ref={pagesRef}
              onClick={() => { setPagesOpen(!pagesOpen); setBlogOpen(false); }}
              >
              Pages ▾
              {pagesOpen && (
                <ul className="dropdown">
                  {pagesLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><a href="/pricing">Pricing</a></li> 

            {/* Blog dropdown */}
            <li
              className="has-dropdown"
              ref={blogRef}
              onClick={() => { setBlogOpen(!blogOpen); setPagesOpen(false); }}
              >
              Blog ▾
              {blogOpen && (
                <ul className="dropdown">
                  {blogLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="right">
          <ContactButton text="Contact us" bgColor="#f5b942" />
          <div className="phone">
            <img src="https://html.designingmedia.com/eluxen/assets/images/phone-icon.png" alt="phone" />
            +5689 2589 6325
          </div>
        </div>
              </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        <ul>
          <li onClick={() => setMenuOpen(false)}>Home</li>
          <li onClick={() => setMenuOpen(false)}>About</li>
          <li onClick={() => setMenuOpen(false)}>Services</li>
          <li onClick={() => setMenuOpen(false)}>Pricing</li>
          <li onClick={() => setMenuOpen(false)}>FAQ</li>
          <li onClick={() => setMenuOpen(false)}>Contact</li>
        </ul>
      </div>

      {/* Backdrop for mobile */}
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
