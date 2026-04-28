import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AboutUs2.css";
import ContactButton from "./ContactButton";

const AboutUs2 = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => setAbout(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!about) return null;

  return (
    <div className="about2-wrapper">
      <div className="about2-box">

        {/* LEFT — single image */}
        <div className="about2-image">
          <img
            src="https://html.designingmedia.com/eluxen/assets/images/main-about-us-img.jpg"
            alt="About Us"
          />
        </div>

        {/* RIGHT — same content */}
        <div className="about2-content">
          <span className="tag">About Us</span>

          <h1>{about.subtitle}</h1>

          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: about.description }}
          />

          <div className="points">
            <p>✔ Restores shine & clarity with meticulous interior and exterior detailing.</p>
            <p>✔ Delivers consistent, quality results through a detail-driven approach.</p>
          </div>

       
                    <ContactButton text=" Read more" bgColor="#f5b942" className="about-btn"/>

        </div>

      </div>
    </div>
  );
};

export default AboutUs2;
