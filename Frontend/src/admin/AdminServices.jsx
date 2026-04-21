import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminServices.css";


const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    number: "",
    title: "",
    description: "",
    image: null,
  });

  // fetch
  const fetchServices = () => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle image
  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("number", form.number);
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    if (editId) {
      await axios.put(`http://localhost:5000/api/services/${editId}`, data);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/services", data);
    }

    setForm({ number: "", title: "", description: "", image: null });
    fetchServices();
  };

  // delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/services/${id}`)
      .then(() => fetchServices());
  };

  return (
   <div className="admin-container">

  {/* FORM */}
  <form onSubmit={handleSubmit} className="admin-form">
    <h2>{editId ? "Update Service" : "Add Service"}</h2>

    <div className="form-grid">
      <input
        name="number"
        value={form.number}
        onChange={handleChange}
        placeholder="Number"
      />

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="full"
      />

      <input
        type="file"
        onChange={handleImage}
        className="full"
      />
    </div>

    <button className="admin-btn">
      {editId ? "Update" : "Add"}
    </button>
  </form>

  {/* CARDS */}
  <div className="card-grid">
    {services.map((s, index) => (
      <div key={s._id || index} className="card">

        <img src={s.image} alt="" />

        <div className="card-body">
          <h3>{s.title}</h3>
          <p>{s.description}</p>

          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={() => {
                setForm({
                  number: s.number,
                  title: s.title,
                  description: s.description,
                  image: null
                });
                setEditId(s._id);
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(s._id)}
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

export default AdminServices;