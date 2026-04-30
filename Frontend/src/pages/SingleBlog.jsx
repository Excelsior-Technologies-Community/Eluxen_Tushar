import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer_1";
import "../assets/css/SingleBlog.css";

const SingleBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [slug]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (!blog) return (
    <>
      <div style={{ position: "relative" }}><Navbar /></div>
      <div style={{ padding: "200px 60px", color: "#fff", background: "#0a0a0a", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <div style={{ position: "relative" }}><Navbar /></div>

      <div className="single-blog">

        {/* HERO IMAGE */}
        <div className="single-blog-hero">
          <img
            src={blog.image || "https://html.designingmedia.com/eluxen/assets/images/single-blog-tab-img1.jpg"}
            alt={blog.title}
          />
          <div className="single-blog-overlay" />
          <div className="single-blog-hero-content">
            <span className="blog-category">{blog.category}</span>
            <h1>{blog.title}</h1>
            <div className="blog-meta">
              <span>✍ {blog.author}</span>
              <span>📅 {formatDate(blog.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="single-blog-body">
          <div
            className="single-blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
          />

          <Link to="/blog" className="back-btn">
            ← Back to Blog
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default SingleBlog;
