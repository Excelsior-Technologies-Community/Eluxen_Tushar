import React from "react";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import BestServices from "../components/BestServices";
import PremiumCare from "../components/PremiumCare";
import Footer from "../components/Footer_1";
import OurProcess from "../components/OurProcess";
import Contact from "../components/Contact";

const Services = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar />
        <PageHero pageName="services" />
      </div>
      <BestServices />
      <OurProcess />
      <PremiumCare />
      <Contact />
      <Footer />
    </>
  );
};

export default Services;
