import React, { useEffect, useState } from "react";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../assets/css/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery")
      .then((res) => setImages(res.data));
  }, []);

  return (
    <section className="gallery">
      <div className="gallery-header">
        <span className="tag">Gallery</span>
        <h2>See What We’ve Done for Our Clients</h2>
      </div>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            className="gallery-item"
            key={img._id}
            onClick={() => setIndex(i)}
          >
            <img src={img.image} alt="" />

            <div className="overlay">
              <span>+</span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.image }))}
        index={index}
      />
    </section>
  );
};

export default Gallery;
