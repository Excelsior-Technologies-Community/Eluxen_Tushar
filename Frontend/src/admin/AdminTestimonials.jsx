import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css"; // reuse same admin CSS

const emptyForm = {
  name: "",
  role: "Happy Client",
  review: "",
  order: 0,
  image: null,
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");

  const fetchTestimonials = () => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((res) => setTestimonials(res.data));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("review", form.review);
    data.append("order", form.order);
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/testimonials/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/testimonials", data);
      }

      setForm(emptyForm);
      setPreview("");
      fetchTestimonials();
    } catch (err) {
      console.log(err);
      alert("Error saving testimonial");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name,
      role: item.role,
      review: item.review,
      order: item.order,
      image: null,
    });
    setPreview(item.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    axios
      .delete(`http://localhost:5000/api/testimonials/${id}`)
      .then(() => fetchTestimonials());
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm);
    setPreview("");
  };

  return (
    <div className="admin-container">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editId ? "Update Testimonial" : "Add Testimonial"}</h2>

        <div className="form-grid">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client Name"
            required
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role (e.g. Happy Client)"
          />
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            placeholder="Display Order"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
            placeholder="Client review text..."
            required
            className="full"
            rows={4}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd", resize: "vertical" }}
          />
        </div>

        {preview && (
          <div style={{ margin: "12px 0" }}>
            <img
              src={preview}
              alt="preview"
              style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", border: "2px solid #facc15" }}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="admin-btn">
            {editId ? "Update" : "Add Testimonial"}
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
      <div className="card-grid">
        {testimonials.map((item) => (
          <div className="card" key={item._id}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div style={{
                  width: "50px", height: "50px", borderRadius: "50%",
                  background: "#3460fc", color: "#fff", fontSize: "20px",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600
                }}>
                  {item.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <strong style={{ display: "block" }}>{item.name}</strong>
                <span style={{ fontSize: "12px", color: "#888" }}>{item.role}</span>
              </div>
            </div>

            <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.6", marginBottom: "14px" }}>
              {item.review.length > 120 ? item.review.slice(0, 120) + "..." : item.review}
            </p>

            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminTestimonials;
