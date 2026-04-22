import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BestServices from "./components/BestServices";

// Admin components
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminServices from "./admin/AdminServices";
import AdminHero from "./admin/AdminHero";
import CounterSection from './components/CounterSection';
import AboutUs from './components/AboutUs';
import AdminAbout from './admin/AdminAbout';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🌐 WEBSITE */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <BestServices />
              <CounterSection />
              <AboutUs />
            </>
          }
        />

        {/* 🔐 ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Hero Section */}
          <Route path="hero" element={<AdminHero />} />

          {/* Services Section */}
          <Route path="services" element={<AdminServices />} />

          {/* About Us Section */}
          <Route path="/admin/about" element={<AdminAbout />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;