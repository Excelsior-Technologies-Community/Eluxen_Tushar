import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminPricing.css";

const emptyForm = {
  planName: "",
  tagline: "",
  price: "",
  isPopular: false,
  order: 0,
};

const AdminPricing = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ Fetch all plans
  const fetchPlans = () => {
    axios
      .get("http://localhost:5000/api/pricing")
      .then((res) => setPlans(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ✅ Handle form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ✅ Add feature tag
  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    setFeatures([...features, trimmed]);
    setFeatureInput("");
  };

  // ✅ Remove feature tag
  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // ✅ Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form, features };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/pricing/${editId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/pricing", payload);
      }
      resetForm();
      fetchPlans();
    } catch (err) {
      alert("Error saving plan");
      console.log(err);
    }
  };

  // ✅ Edit mode
  const handleEdit = (plan) => {
    setForm({
      planName: plan.planName,
      tagline: plan.tagline,
      price: plan.price,
      isPopular: plan.isPopular,
      order: plan.order,
    });
    setFeatures(plan.features || []);
    setEditId(plan._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete plan
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/pricing/${id}`);
      fetchPlans();
    } catch (err) {
      alert("Error deleting plan");
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm(emptyForm);
    setFeatures([]);
    setFeatureInput("");
    setEditId(null);
  };

  return (
    <div className="admin-pricing-container">
      <h2> Pricing Plans</h2>

      {/* ===== FORM ===== */}
      <div className="pricing-form">
        <h3>{editId ? "✏️ Update Plan" : "➕ Add New Plan"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Plan Name</label>
              <input
                name="planName"
                value={form.planName}
                onChange={handleChange}
                placeholder="e.g. Basic, Premium, Ultimate"
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 49"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tagline</label>
              <input
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="e.g. Perfect for regular upkeep"
              />
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                placeholder="1, 2, 3..."
              />
            </div>
          </div>

          {/* Popular Toggle */}
          <div className="popular-toggle">
            <input
              type="checkbox"
              id="isPopular"
              name="isPopular"
              checked={form.isPopular}
              onChange={handleChange}
            />
            <label htmlFor="isPopular">Mark as Most Popular</label>
          </div>

          {/* Features Input */}
          <div className="form-group">
            <label>Features</label>
            <div className="features-input-row">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. Exterior hand wash & dry"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <button
                type="button"
                className="add-feature-btn"
                onClick={addFeature}
              >
                +
              </button>
            </div>
          </div>

          {/* Feature Tags */}
          {features.length > 0 && (
            <div className="features-tags">
              {features.map((f, i) => (
                <div className="feature-tag" key={i}>
                  {f}
                  <button type="button" onClick={() => removeFeature(i)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editId ? "Update Plan" : "Add Plan"}
            </button>
            {editId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ===== PLANS LIST ===== */}
      <div className="plans-grid">
        {plans.length === 0 ? (
          <div className="empty-state">
            No pricing plans yet. Add your first plan above!
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan._id}
              className={`plan-row ${plan.isPopular ? "popular-row" : ""}`}
            >
              <div className="plan-info">
                <h4>
                  {plan.planName}
                  {plan.isPopular && <span className="badge">Most Popular</span>}
                </h4>
                <p>{plan.tagline}</p>
                <div className="features-tags">
                  {plan.features.map((f, i) => (
                    <span className="feature-tag" key={i}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="plan-price">${plan.price}</div>

              <div className="plan-features-count">
                {plan.features.length} features
              </div>

              <div className="plan-actions">
                <button className="edit-btn" onClick={() => handleEdit(plan)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPricing;
