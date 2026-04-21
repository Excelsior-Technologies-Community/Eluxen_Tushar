import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Dashboard.css";

const Dashboard = () => {
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServicesCount(res.data.length));
  }, []);

  return (
    <div className="dashboard-container">

      <h1>Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Services</h3>
          <p>{servicesCount}</p>
        </div>

        <div className="card">
          <h3>Hero Sections</h3>
          <p>1</p>
        </div>

        <div className="card">
          <h3>Status</h3>
          <p>Active</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;