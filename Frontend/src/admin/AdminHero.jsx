import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminHero.css";

const AdminHero = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: null,
    bgImage: ""
  });

  // 🔥 Fetch existing hero
  useEffect(() => {
    axios.get("http://localhost:5000/api/hero")
      .then(res => {
        if (res.data) {
          setForm({
            title: res.data.title || "",
            subtitle: res.data.subtitle || "",
            image: null,
            bgImage: res.data.bgImage || ""
          });
        }
      });
  }, []);

  // 🔥 Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Handle image file
  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🔥 Submit form (FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("subtitle", form.subtitle);
    if (form.image) {
      data.append("image", form.image);
    }

    await axios.post("http://localhost:5000/api/hero", data);

    alert("Hero Saved ✅");
  };

  // 🔥 Preview image (file OR saved URL)
  const previewImage = form.image
    ? URL.createObjectURL(form.image)
    : form.bgImage;

  return (
    <div className="admin-hero-container">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="hero-form">
        <h2>Hero Section</h2>

        <input
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          name="subtitle"
          value={form.subtitle || ""}
          onChange={handleChange}
          placeholder="Subtitle"
        />

        <input
          type="file"
          onChange={handleImage}
        />

        <button className="hero-btn">Save</button>
      </form>

      {/* PREVIEW */}
      {previewImage && (
        <div className="hero-preview">
          <img src={previewImage} alt="preview" />

          <div className="hero-text">
            <h3>{form.title}</h3>
            <p>{form.subtitle}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminHero;