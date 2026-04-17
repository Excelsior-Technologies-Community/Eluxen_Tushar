import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Hero.css";
import ContactButton from "./ContactButton";
import ClientCard from "./ClientCard";

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hero")
      .then((res) => setHero(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!hero) return <h2>Loading...</h2>;

  return (
    <section
      className="hero"
      style={{
        background: `url(${hero.bgImage}) no-repeat center/cover`,
      }}
    >
      <div className="overlay">
        <h1 style={{ whiteSpace: "pre-line" }}>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <div className="hero-buttons">
          <ContactButton
            text="Book now"
            bgColor="#3460fc"
            textColor="#fff"
            hoverColor="#f5b942"
            hoverText="#000"
          />
          <ContactButton text=" Read more" bgColor="#f5b942" />
        </div>
      </div>
      <div className="ClientCard" >
      <ClientCard />
    </div>
    </section>
  );
};

export default Hero;
