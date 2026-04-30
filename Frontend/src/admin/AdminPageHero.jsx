import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css";

const PAGES = ["about", "services", "pricing", "contact", "faq", "team", "blog"];

const emptyForm = {
  page: "about",
  title: "",
  subtitle: "",
  bgImage: null,
  existingImage: "",
};

const AdminPageHero = () => {
  const [heroes, setHeroes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [editPage, setEditPage] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchHeroes = () => {
    axios.get("http://localhost:5000/api/page-hero").then((res) => setHeroes(res.data));
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, bgImage: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleEdit = (item) => {
    setEditPage(item.page);
    setForm({
      page: item.page,
      title: item.title,
      subtitle: item.subtitle || "",
      bgImage: null,
      existingImage: item.bgImage || "",
    });
    setPreview(item.bgImage || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditPage(null);
    setForm(emptyForm);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append("page", form.page);
      data.append("title", form.title);
      data.append("subtitle", form.subtitle);
      data.append("existingImage", form.existingImage);
      if (form.bgImage) data.append("bgImage", form.bgImage);

      await axios.post("http://localhost:5000/api/page-hero", data);
      setEditPage(null);
      setForm(emptyForm);
      setPreview("");
      fetchHeroes();
    } catch (err) {
      alert("Error saving page hero");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this page hero?")) return;
    axios.delete(`http://localhost:5000/api/page-hero/${id}`).then(fetchHeroes);
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editPage ? `Edit: ${editPage} page hero` : "Add Page Hero"}</h2>

        <div className="form-grid">
          {/* Page selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "#555", fontWeight: 500 }}>Page</label>
            <select
              name="page"
              value={form.page}
              onChange={handleChange}
              disabled={!!editPage}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
                background: editPage ? "#f3f4f6" : "#fff",
              }}
            >
              {PAGES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Hero Title (e.g. About Us)"
            required
          />

          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle (optional)"
            className="full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="full"
          />
        </div>

        {preview && (
          <div style={{ margin: "12px 0" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: "160px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button type="submit" className="admin-btn" disabled={saving}>
            {saving ? "Saving..." : editPage ? "Update" : "Save"}
          </button>
          {editPage && (
            <button
              type="button"
              className="admin-btn"
              style={{ background: "#f3f4f6", color: "#333" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {heroes.length === 0 && (
          <p style={{ color: "#aaa", textAlign: "center", padding: "30px" }}>
            Koi page hero nahi hai abhi. Upar se add karo.
          </p>
        )}
        {heroes.map((item) => (
          <div key={item._id} className="card">
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {item.bgImage && (
                <img
                  src={item.bgImage}
                  alt={item.page}
                  style={{
                    width: "100px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#3460fc",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {item.page}
                </span>
                <p style={{ fontWeight: 600, margin: "6px 0 2px", fontSize: "15px" }}>
                  {item.title}
                </p>
                {item.subtitle && (
                  <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                    {item.subtitle}
                  </p>
                )}
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPageHero;
