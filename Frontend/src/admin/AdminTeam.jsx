import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css";

const emptyForm = { name: "", role: "", facebook: "", instagram: "", linkedin: "", order: 0, image: null };

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");

  const fetchTeam = () => {
    axios.get("http://localhost:5000/api/team").then((res) => setTeam(res.data));
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    data.append("facebook", form.facebook);
    data.append("instagram", form.instagram);
    data.append("linkedin", form.linkedin);
    data.append("order", form.order);
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/team/${editId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/team", data, { headers: { "Content-Type": "multipart/form-data" } });
      }
      setForm(emptyForm);
      setPreview("");
      fetchTeam();
    } catch (err) {
      alert("Error saving team member");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ name: item.name, role: item.role, facebook: item.facebook || "", instagram: item.instagram || "", linkedin: item.linkedin || "", order: item.order, image: null });
    setPreview(item.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this team member?")) return;
    axios.delete(`http://localhost:5000/api/team/${id}`).then(fetchTeam);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm);
    setPreview("");
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editId ? "Update Team Member" : "Add Team Member"}</h2>

        <div className="form-grid">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="role" value={form.role} onChange={handleChange} placeholder="Role (e.g. Lead Detailer)" required />
          <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook URL (optional)" />
          <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram URL (optional)" />
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL (optional)" />
          <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="Display Order" />
          <input type="file" accept="image/*" onChange={handleImage} className="full" />
        </div>

        {preview && (
          <img src={preview} alt="preview" style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "10px", margin: "10px 0", border: "2px solid #f5b942" }} />
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button type="submit" className="admin-btn">{editId ? "Update" : "Add Member"}</button>
          {editId && (
            <button type="button" className="admin-btn" style={{ background: "#f3f4f6", color: "#333" }} onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {team.map((item) => (
          <div key={item._id} className="card" style={{ width: "200px", textAlign: "center", padding: "16px" }}>
            {item.image ? (
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} />
            ) : (
              <div style={{ width: "100%", height: "160px", background: "#3460fc", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "#fff", fontWeight: 700, marginBottom: "10px" }}>
                {item.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <p style={{ fontWeight: 700, margin: "0 0 4px", fontSize: "14px" }}>{item.name}</p>
            <p style={{ color: "#f5b942", fontSize: "12px", margin: "0 0 8px" }}>{item.role}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "10px", fontSize: "11px", color: "#aaa" }}>
              {item.facebook && <span>FB</span>}
              {item.instagram && <span>IG</span>}
              {item.linkedin && <span>LI</span>}
            </div>
            <div className="card-actions" style={{ justifyContent: "center" }}>
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeam;
