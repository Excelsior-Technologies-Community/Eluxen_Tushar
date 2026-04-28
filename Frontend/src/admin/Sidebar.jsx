import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/Sidebar.css";

const navItems = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", path: "/admin" },
      { label: "Hero", path: "/admin/hero" },
      { label: "Services", path: "/admin/services" },
      { label: "AboutUs", path: "/admin/about" },
      { label: "Pricing",    path: "/admin/pricing" },
      { label: "Testimonials", path: "/admin/testimonials" },
      { label: "FAQ", path: "/admin/faq" },
      { label: "Contacts", path: "/admin/contacts" },
      { label: "Page Heroes", path: "/admin/page-hero" },



    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      {navItems.map((section) => (
        <div key={section.section}>
          <p className="section-title">{section.section}</p>

          {section.items.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;