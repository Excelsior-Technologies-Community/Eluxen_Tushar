import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section>
        <h1>Premium Car Detailing</h1>
        <p>Best service for your car</p>
      </section>

      {/* Services Section */}
      <section>
        <h2>Our Services</h2>
      </section>

    </>
  );
};

export default Home;