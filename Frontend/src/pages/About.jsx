import React from "react";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import CounterSection from "../components/CounterSection";
import PremiumCare from "../components/PremiumCare";
import Footer from "../components/Footer_1";
import Contact from "../components/Contact";
import AboutUs2 from "../components/AboutUs2";

const About = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar />
        <PageHero pageName="about" />
      </div>
      <AboutUs2 />
      <CounterSection />
      <PremiumCare />
      <Contact />
      <Footer />
    </>
  );
};

export default About;
