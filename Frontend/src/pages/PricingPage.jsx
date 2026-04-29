import React from "react";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import PremiumCare from "../components/PremiumCare";
import Footer from "../components/Footer_1";
import Contact from "../components/Contact";
import Pricing from "../components/Pricing";
import CounterItem from "../components/CounterItem";
import CounterSection from "../components/CounterSection";
import Gallery from "../components/Gallery";

const PricingPage = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar />
        <PageHero pageName="pricing" />
      </div>
      <Pricing />
      <Gallery />
      <CounterSection/>
      <PremiumCare />
      <Contact />
      <Footer />
    </>
  )
}

export default PricingPage
