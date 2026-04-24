import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css";

const emptyForm = { question: "", answer: "", order: 0 };

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchFAQs = () => {
    axios
      .get("http://localhost:5000/api/faqs")
      .then((res) => setFaqs(res.data));
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/faqs/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/faqs", form);
      }
      setForm(emptyForm);
      fetchFAQs();
    } catch (err) {
      console.log(err);
      alert("Error saving FAQ");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ question: item.question, answer: item.answer, order: item.order });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    axios.delete(`http://localhost:5000/api/faqs/${id}`).then(() => fetchFAQs());
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  return (
    <div className="admin-container">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editId ? "Update FAQ" : "Add FAQ"}</h2>

        <div className="form-grid">
          <input
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Question"
            required
            className="full"
          />
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            placeholder="Display Order"
          />
          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Answer..."
            required
            className="full"
            rows={4}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              resize: "vertical",
              fontSize: "14px"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button type="submit" className="admin-btn">
            {editId ? "Update" : "Add FAQ"}
          </button>
          {editId && (
            <button
              type="button"
              className="admin-btn"
              style={{ background: "#e5e7eb" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}
      >
        {faqs.map((item) => (
          <div
            key={item._id}
            className="card"
            style={{ padding: "20px 24px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px"
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, marginBottom: "8px", fontSize: "15px" }}>
                  {item.question}
                </p>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                  {item.answer.length > 140
                    ? item.answer.slice(0, 140) + "..."
                    : item.answer}
                </p>
                <span style={{ fontSize: "12px", color: "#aaa", marginTop: "6px", display: "block" }}>
                  Order: {item.order}
                </span>
              </div>
              <div className="card-actions" style={{ flexShrink: 0 }}>
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>
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

export default AdminFAQ;
