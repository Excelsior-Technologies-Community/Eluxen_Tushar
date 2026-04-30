import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/Blog.css";

const CATEGORIES = [
  "All",
  "Advices",
  "Announcements",
  "News",
  "Consultation",
  "Development",
];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filtered =
    activeTab === "All" ? blogs : blogs.filter((b) => b.category === activeTab);

  return (
    <section className="blog-section">
      {/* CATEGORY TABS */}
      <div className="blog-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`blog-tab ${activeTab === cat ? "active" : ""}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="no-blogs">No blogs found in this category.</p>
      ) : (
        <div className="blog-grid">
          {filtered.map((blog) => (
            <div className="blog-card" key={blog._id}>
              {/* IMAGE */}
              <div className="blog-img-wrap">
                <img
                  src={
                    blog.image ||
                    "https://html.designingmedia.com/eluxen/assets/images/single-blog-tab-img1.jpg"
                  }
                  alt={blog.title}
                />
              </div>

              {/* CONTENT */}
              <div className="blog-content">
                <div className="blog-meta">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#f5b942"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    Posted by {blog.author}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#f5b942"
                      className="bi bi-calendar3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                    {formatDate(blog.createdAt)}
                  </span>
                </div>

                <h4>
                  <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h4>

                {blog.excerpt && <p>{blog.excerpt}</p>}

                <Link to={`/blog/${blog.slug}`} className="blog-read-more">
                  Read More
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogList;
