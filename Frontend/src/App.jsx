import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BestServices from "./components/BestServices";
import CounterSection from './components/CounterSection';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing'; 
import OurProcess from './components/OurProcess';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import PremiumCare from './components/PremiumCare';
import Contact from './components/Contact';
import Footer from './components/Footer_1';

// Pages
import About from './pages/About';
import Services from './pages/Services';

// Admin components
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminServices from "./admin/AdminServices";
import AdminHero from "./admin/AdminHero";
import AdminAbout from './admin/AdminAbout';
import AdminPricing from './admin/AdminPricing'; 
import AdminContacts from './admin/AdminContacts';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminPageHero from './admin/AdminPageHero';
import AdminFAQ from './admin/AdminFAQ';
import PricingPage from './pages/PricingPage';
import TeamPage from './pages/TeamPage';
import AdminTeam from './admin/AdminTeam';
import AdminGallery from './pages/AdminGallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOMEPAGE */}
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

        {/* ABOUT PAGE */}
        <Route path="/about" element={<About />} />

        {/* SERVICES PAGE */}
        <Route path="/services" element={<Services />} />

        {/* PRICING PAGE */}
        <Route path="/pricing" element={<PricingPage />} />

        {/* Team PAGE */}
        <Route path="/team" element={<TeamPage />} />

        
        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faq" element={<AdminFAQ />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="page-hero" element={<AdminPageHero />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
