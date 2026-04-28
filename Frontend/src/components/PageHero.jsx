import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/PageHero.css";

// pageName prop = "about" | "services" | "pricing" | "contact" | "faq"
const PageHero = ({ pageName }) => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/page-hero/${pageName}`)
      .then((res) => setHero(res.data))
      .catch(() => setHero(null));
  }, [pageName]);

  if (!hero) return null;

  return (
    <div
      className="page-hero"
      style={{
        backgroundImage: hero.bgImage
          ? `url(${hero.bgImage})`
          : `url(https://html.designingmedia.com/eluxen/assets/images/banner-img.jpg)`,
      }}
    >
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <h1>{hero.title}</h1>
        {hero.subtitle && <p>{hero.subtitle}</p>}

        {/* Breadcrumb */}
        <div className="page-hero-breadcrumb">
          <span> <a href="/">Home</a></span>
          <span className="separator">›</span>
          <span className="current">{hero.title}</span>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
