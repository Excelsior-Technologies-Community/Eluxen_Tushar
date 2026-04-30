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
import PricingPage from './pages/PricingPage';
import TeamPage from './pages/TeamPage';
import AdminBlog from './admin/AdminBlog';
import Blog from './pages/Blog';
import SingleBlog from './pages/SingleBlog';


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
import AdminTeam from './admin/AdminTeam';
import AdminGallery from './admin/AdminGallery';

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

        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<SingleBlog />} />

        
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
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="blog" element={<AdminBlog />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
