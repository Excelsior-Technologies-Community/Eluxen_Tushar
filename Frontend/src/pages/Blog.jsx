import React from "react";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import BlogList from "../components/BlogList";
import Footer from "../components/Footer_1";

const Blog = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar />
        <PageHero pageName="blog" />
      </div>
      <BlogList />
      <Footer />
    </>
  );
};

export default Blog;
