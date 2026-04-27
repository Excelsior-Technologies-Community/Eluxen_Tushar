import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BestServices from "./components/BestServices";
import CounterSection from './components/CounterSection';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing'; 

// Admin components
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminServices from "./admin/AdminServices";
import AdminHero from "./admin/AdminHero";
import AdminAbout from './admin/AdminAbout';
import AdminPricing from './admin/AdminPricing'; 
import OurProcess from './components/OurProcess';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import PremiumCare from './components/PremiumCare';
import Contact from './components/Contact';
import AdminContacts from './admin/AdminContacts';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminFAQ from './admin/AdminFAQ';
import Footer from './components/Footer_1';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  WEBSITE */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <BestServices />
              <CounterSection />
              <AboutUs />
              <OurProcess />
              <Pricing />  
              <Testimonials />
              <PremiumCare />
              <FAQ />
              <Contact />
              <Footer />
            </>
          }
        />

        {/*  ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faq" element={<AdminFAQ />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
