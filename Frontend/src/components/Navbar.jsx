import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Navbar.css";
import ContactButton from "./ContactButton";
import { useLocation } from "react-router-dom";

const pagesLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "FAQ's", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
  { label: "Team", href: "/team" },
];

const blogLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Single Blog", href: "/single-blog" },
  { label: "One Column", href: "/one-column" },
  { label: "Two Column", href: "/two-column" },
];

const standaloneRoutes = ["/", "/about", "/services", "/pricing"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [pagesClicked, setPagesClicked] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const pagesRef = useRef(null);
  const blogRef = useRef(null);

  const isBlogActive = blogLinks.some((link) => link.href === currentPath);

  // If user navigates to a standalone route, deactivate pages highlight
  useEffect(() => {
    if (standaloneRoutes.includes(currentPath)) {
      setPagesClicked(false);
    }
  }, [currentPath]);

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
              <li className={currentPath === "/" ? "active" : ""}>
                <a href="/">Home</a>
              </li>
              <li className={currentPath === "/about" ? "active" : ""}>
                <a href="/about">About</a>
              </li>
              <li className={currentPath === "/services" ? "active" : ""}>
                <a href="/services">Services</a>
              </li>

              {/* Pages dropdown */}
              <li
                className={`has-dropdown ${pagesClicked ? "active" : ""}`}
                ref={pagesRef}
                onClick={() => {
                  setPagesOpen(!pagesOpen);
                  setPagesClicked(true);
                  setBlogOpen(false);
                }}
              >
                Pages ▾
                {pagesOpen && (
                  <ul className="dropdown">
                    {pagesLinks.map((link) => (
                      <li key={link.label} className={currentPath === link.href ? "active" : ""}>
                        <a href={link.href} onClick={(e) => e.stopPropagation()}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className={currentPath === "/pricing" ? "active" : ""}>
                <a href="/pricing">Pricing</a>
              </li>

              {/* Blog dropdown */}
              <li
                className={`has-dropdown ${isBlogActive ? "active" : ""}`}
                ref={blogRef}
                onClick={() => { setBlogOpen(!blogOpen); setPagesOpen(false); }}
              >
                Blog ▾
                {blogOpen && (
                  <ul className="dropdown">
                    {blogLinks.map((link) => (
                      <li key={link.label} className={currentPath === link.href ? "active" : ""}>
                        <a href={link.href} onClick={(e) => e.stopPropagation()}>{link.label}</a>
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
          <li className={currentPath === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}><a href="/">Home</a></li>
          <li className={currentPath === "/about" ? "active" : ""} onClick={() => setMenuOpen(false)}><a href="/about">About</a></li>
          <li className={currentPath === "/services" ? "active" : ""} onClick={() => setMenuOpen(false)}><a href="/services">Services</a></li>
          <li className={currentPath === "/pricing" ? "active" : ""} onClick={() => setMenuOpen(false)}><a href="/pricing">Pricing</a></li>
          <li className={currentPath === "/faq" ? "active" : ""} onClick={() => setMenuOpen(false)}><a href="/faq">FAQ</a></li>
          <li className={currentPath === "/contact" ? "active" : ""} onClick={() => setMenuOpen(false)}><a href="/contact">Contact</a></li>
        </ul>
      </div>

      {/* Backdrop for mobile */}
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;