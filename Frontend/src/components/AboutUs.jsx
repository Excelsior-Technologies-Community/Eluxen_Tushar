import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AboutUs.css";

const AboutUs = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => setAbout(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!about) return <p>Loading...</p>;

  return (
    <div className="about-wrapper">
      <div className="about-box">

        {/* LEFT IMAGES */}
        <div className="about-images">
          <img
            src={`http://localhost:5000${about.images?.[0]}`}
            className="img-big"
            alt=""
          />

          <div className="img-small-group">
            <img src={`http://localhost:5000${about.images?.[1]}`} alt="" />
          <div className="img-small-group2">
            <img src={`http://localhost:5000${about.images?.[2]}`} alt="" />

          </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-content">
          <span className="tag">About Us</span>

          <h1>
            {about.subtitle}
          </h1>

          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: about.description }}
          />

          <div className="points">
            <p>✔ Exceptional Quality with Industry-Leading Products.</p>
            <p>✔ Tailored Detailing Services for Every Vehicle & Lifestyle.</p>
          </div>

          <button className="about-btn">
            Read more <span>↗</span>
          </button>
        </div>
        <div className="car-vector">
            <img src="https://html.designingmedia.com/eluxen/assets/images/car-vector.png" alt="" />
        </div>

      </div>
    </div>
  );
};

export default AboutUs;