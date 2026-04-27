import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css";

const statusColors = {
  new: { bg: "#fef3c7", color: "#92400e" },
  read: { bg: "#dbeafe", color: "#1e40af" },
  replied: { bg: "#d1fae5", color: "#065f46" },
};

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => setContacts(res.data));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatus = (id, status) => {
    axios
      .put(`http://localhost:5000/api/contact/${id}`, { status })
      .then(() => fetchContacts());
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    axios
      .delete(`http://localhost:5000/api/contact/${id}`)
      .then(() => fetchContacts());
  };

  return (
    <div className="admin-container">
      <h2 style={{ marginBottom: "24px" }}>Contact Inquiries</h2>

      {contacts.length === 0 && (
        <p style={{ color: "#888" }}>No inquiries yet.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {contacts.map((item) => (
          <div key={item._id} className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <strong style={{ fontSize: "16px" }}>{item.name}</strong>
                  <span style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: statusColors[item.status]?.bg,
                    color: statusColors[item.status]?.color,
                  }}>
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <p style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                  📧 {item.email} &nbsp;|&nbsp; 📞 {item.phone || "—"} &nbsp;|&nbsp; 🔧 {item.service || "—"}
                </p>
                <p style={{ fontSize: "13px", color: "#444", lineHeight: "1.6", marginBottom: "8px" }}>
                  {item.message}
                </p>
                <p style={{ fontSize: "11px", color: "#aaa" }}>
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "120px" }}>
                <select
                  value={item.status}
                  onChange={(e) => handleStatus(item._id, e.target.value)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
