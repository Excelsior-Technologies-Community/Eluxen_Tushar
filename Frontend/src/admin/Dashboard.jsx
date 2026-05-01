import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    services: 0,
    testimonials: 0,
    faqs: 0,
    team: 0,
    blogs: 0,
    contacts: 0,
    pricing: 0,
  });

  useEffect(() => {
    const apis = [
      { key: "services",     url: "http://localhost:5000/api/services" },
      { key: "testimonials", url: "http://localhost:5000/api/testimonials" },
      { key: "faqs",         url: "http://localhost:5000/api/faqs" },
      { key: "team",         url: "http://localhost:5000/api/team" },
      { key: "blogs",        url: "http://localhost:5000/api/blogs" },
      { key: "contacts",     url: "http://localhost:5000/api/contact" },
      { key: "pricing",      url: "http://localhost:5000/api/pricing" },
    ];

    apis.forEach(({ key, url }) => {
      axios.get(url)
        .then(res => setCounts(prev => ({ ...prev, [key]: res.data.length })))
        .catch(() => {});
    });
  }, []);

  const statCards = [
    { label: "Inquiries",    value: counts.contacts,     icon: "📬", path: "/admin/contacts",     color: "#f5b942" },
    { label: "Services",     value: counts.services,     icon: "🔧", path: "/admin/services",     color: "#f5b942" },
    { label: "Pricing Plans",value: counts.pricing,      icon: "💰", path: "/admin/pricing",      color: "#f5b942" },
    { label: "Testimonials", value: counts.testimonials, icon: "⭐", path: "/admin/testimonials", color: "#f5b942" },
    { label: "FAQs",         value: counts.faqs,         icon: "❓", path: "/admin/faq",          color: "#f5b942" },
    { label: "Team Members", value: counts.team,         icon: "👥", path: "/admin/team",         color: "#f5b942" },
    { label: "Blog Posts",   value: counts.blogs,        icon: "📝", path: "/admin/blog",         color: "#f5b942" },
  ];

  const quickLinks = [
    { label: "Edit Hero",       path: "/admin/hero",       icon: "🖼" },
    { label: "Edit About Us",   path: "/admin/about",      icon: "📄" },
    { label: "Page Heroes",     path: "/admin/page-hero",  icon: "🗂" },
    { label: "Gallery",         path: "/admin/gallery",    icon: "🖼" },
  ];

  return (
    <div className="dash">

      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-sub">Welcome back! Here's what's happening.</p>
        </div>
        <div className="dash-date">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="dash-grid">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="dash-card"
            onClick={() => navigate(card.path)}
            style={{ "--accent": card.color }}
          >
            <div className="dash-card-icon">{card.icon}</div>
            <div className="dash-card-info">
              <span className="dash-card-value">{card.value}</span>
              <span className="dash-card-label">{card.label}</span>
            </div>
            <div className="dash-card-bar" />
          </div>
        ))}
      </div>

      {/* QUICK LINKS */}
      <div className="dash-section">
        <h2 className="dash-section-title">Quick Actions</h2>
        <div className="dash-quick">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              className="dash-quick-btn"
              onClick={() => navigate(link.path)}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* SITE OVERVIEW */}
      <div className="dash-section">
        <h2 className="dash-section-title">Site Overview</h2>
        <div className="dash-overview">
          {statCards.map((card) => (
            <div key={card.label} className="dash-overview-row" onClick={() => navigate(card.path)}>
              <div className="dash-overview-left">
                <span className="dash-overview-icon">{card.icon}</span>
                <span className="dash-overview-label">{card.label}</span>
              </div>
              <div className="dash-overview-right">
                <div className="dash-bar-wrap">
                  <div
                    className="dash-bar-fill"
                    style={{ width: `${Math.min(card.value * 10, 100)}%`, background: card.color }}
                  />
                </div>
                <span className="dash-overview-val" style={{ color: card.color }}>{card.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
