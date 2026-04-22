import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../assets/css/AdminAbout.css";

const AdminAbout = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: ""
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // ✅ Fetch existing data
  const fetchAbout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/about");
      if (res.data) {
        setForm({
          title: res.data.title || "",
          subtitle: res.data.subtitle || "",
          description: res.data.description || "",
          buttonText: res.data.buttonText || ""
        });
        setPreview(res.data.images || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // ✅ Handle image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    images.forEach(img => {
      data.append("images", img);
    });

    try {
      await axios.post("http://localhost:5000/api/about/update", data);
      alert("Updated Successfully");
      fetchAbout(); // refresh data
    } catch (err) {
      console.log(err);
      alert("Error updating");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-about-container">

  <h2 className="admin-title">About Section Admin</h2>

  {/* Title */}
  <div className="form-group">
    <label>Title</label>
    <input
      type="text"
      value={form.subtitle}
      onChange={(e) =>
        setForm({ ...form, subtitle: e.target.value })
      }
    />
  </div>

  {/* Description */}
  <div className="form-group custom-quill">
    <label>Description</label>
    <ReactQuill
      value={form.description}
      onChange={(value) =>
        setForm({ ...form, description: value })
      }
    />
  </div>

  {/* Button Text */}
  <div className="form-group">
    <label>Button Text</label>
    <input
      type="text"
      value={form.buttonText}
      onChange={(e) =>
        setForm({ ...form, buttonText: e.target.value })
      }
    />
  </div>

  {/* Upload */}
  <div className="form-group">
    <label>Upload Images (Max 3)</label>
    <div className="file-upload">
      <input type="file" multiple onChange={handleImageChange} />
      <p>Click or drag images here</p>
    </div>
  </div>

  {/* Preview */}
  <div className="preview-container">
    {preview.map((img, index) => (
      <div className="preview-box" key={index}>
        <img
          src={
            img.startsWith("blob:")
              ? img
              : `http://localhost:5000${img}`
          }
          alt="preview"
        />
      </div>
    ))}
  </div>

  <button type="submit" className="submit-btn">
    Update About
  </button>

</form>
  );
};

export default AdminAbout;