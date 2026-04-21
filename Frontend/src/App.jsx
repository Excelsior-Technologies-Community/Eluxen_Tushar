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

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;