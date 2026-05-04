import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Blog.css";

const emptyForm = { title: "", excerpt: "", content: "", category: "Advices", author: "Admin", image: null };

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");
  const [showAll, setShowAll] = useState(false);

  const fetchBlogs = () => {
    axios.get("http://localhost:5000/api/blogs").then((res) => setBlogs(res.data));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) data.append(key, form[key]);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/blogs/${editId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/blogs", data, { headers: { "Content-Type": "multipart/form-data" } });
      }
      setForm(emptyForm);
      setPreview("");
      fetchBlogs();
    } catch (err) {
      alert("Error saving blog");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ title: item.title, excerpt: item.excerpt, content: item.content, category: item.category, author: item.author, image: null });
    setPreview(item.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog?")) return;
    axios.delete(`http://localhost:5000/api/blogs/${id}`).then(fetchBlogs);
  };

  const visibleBlogs = showAll ? blogs : blogs.slice(0, 3);

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editId ? "Update Blog" : "Add Blog"}</h2>

        <div className="form-grid">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Blog Title" required className="full" />
          <select name="category" value={form.category} onChange={handleChange} className="form-select">
            <option value="Advices">Advices</option>
            <option value="Announcements">Announcements</option>
            <option value="News">News</option>
            <option value="Consultation">Consultation</option>
            <option value="Development">Development</option>
          </select>
          <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
          <input type="file" accept="image/*" onChange={handleImage} />
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short excerpt (shown on card)..." rows={3} className="full form-textarea" />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Full blog content (HTML supported)..." rows={8} className="full form-textarea" />
        </div>

        {preview && <img src={preview} alt="preview" className="preview-img" />}

        <div className="form-actions">
          <button type="submit" className="admin-btn">{editId ? "Update" : "Publish"}</button>
          {editId && (
            <button type="button" className="admin-btn cancel-btn" onClick={() => { setEditId(null); setForm(emptyForm); setPreview(""); }}>Cancel</button>
          )}
        </div>
      </form>

      {/* BLOG LIST */}
      <div className="blog-list">
        {visibleBlogs.map((item) => (
          <div key={item._id} className="card">
            <div className="card-inner">
              {item.image && <img src={item.image} alt={item.title} className="card-thumb" />}
              <div className="card-body">
                <span className="card-category">{item.category}</span>
                <p className="card-title">{item.title}</p>
                <p className="card-meta">By {item.author} · {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

        {blogs.length > 3 && (
          <button className="show-all-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `Show All (${blogs.length - 3} more)`}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;