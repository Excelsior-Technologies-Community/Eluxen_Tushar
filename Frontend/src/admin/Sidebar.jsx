import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/Sidebar.css";

const navItems = [
  { label: "Dashboard",    path: "/admin" },
  { label: "Hero",         path: "/admin/hero" },
  { label: "Services",     path: "/admin/services" },
  { label: "About Us",     path: "/admin/about" },
  { label: "Pricing",      path: "/admin/pricing" },
  { label: "Testimonials", path: "/admin/testimonials" },
  { label: "FAQ",          path: "/admin/faq" },
  { label: "Contacts",     path: "/admin/contacts" },
  { label: "Page Heroes",  path: "/admin/page-hero" },
  { label: "Team",         path: "/admin/team" },
  { label: "Gallery",      path: "/admin/gallery" },
  { label: "Blog",         path: "/admin/blog" },
];

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-dot" />
        <img
          src="https://html.designingmedia.com/eluxen/assets/images/logo.png"
          alt="Eluxen"
          className="login-logo"
        />
      </div>

      {/* NAV */}
      <div className="sidebar-nav">
        <p className="section-title">Menu</p>
        {navItems.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-dot" />
            {item.label}
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="sidebar-bottom">
        <div className="nav-item logout-item" onClick={onLogout}>
          <span className="nav-dot" />
          Logout
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
