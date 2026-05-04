import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css";

const emptyForm = {
  name: "",
  role: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  order: 0,
  image: null,
};

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");
  const [showAll, setShowAll] = useState(false);

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
        await axios.put(`http://localhost:5000/api/team/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/team", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
    setForm({
      name: item.name,
      role: item.role,
      facebook: item.facebook || "",
      instagram: item.instagram || "",
      linkedin: item.linkedin || "",
      order: item.order,
      image: null,
    });
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

  const visibleTeam = showAll ? team : team.slice(0, 3);

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

        {preview && <img src={preview} alt="preview" className="team-preview-img" />}

        <div className="form-actions">
          <button type="submit" className="admin-btn">{editId ? "Update" : "Add Member"}</button>
          {editId && (
            <button type="button" className="admin-btn cancel-btn" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>

      <div className="team-grid">
        {visibleTeam.map((item) => (
          <div key={item._id} className="team-card">
            {item.image ? (
              <img src={item.image} alt={item.name} className="team-card-img" />
            ) : (
              <div className="team-card-avatar">
                {item.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="team-card-name">{item.name}</p>
            <p className="team-card-role">{item.role}</p>
            <div className="team-card-socials">
              {item.facebook && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3460fc" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </span>
              )}
              {item.instagram && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3460fc" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </span>
              )}
              {item.linkedin && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3460fc" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="card-actions card-actions--center">
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Del</button>
            </div>
          </div>
        ))}
      </div>

      {team.length > 3 && (
        <button className="show-all-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : `Show All (${team.length - 3} more)`}
        </button>
      )}
    </div>
  );
};

export default AdminTeam;