import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/gallery.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, img, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-card" {...attributes} {...listeners}>
      <img src={img.image} alt="" />
      <button className="btn-delete" onClick={() => onDelete(img._id)}>Delete</button>
    </div>
  );
};

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchImages = () => {
    axios.get("http://localhost:5000/api/gallery")
      .then(res => setImages(res.data));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Select file");
    const formData = new FormData();
    formData.append("image", file);
    await axios.post("http://localhost:5000/api/gallery", formData);
    setFile(null);
    fetchImages();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/gallery/${id}`);
    fetchImages();
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex(i => i._id === active.id);
      const newIndex = images.findIndex(i => i._id === over.id);
      const newItems = arrayMove(images, oldIndex, newIndex);
      setImages(newItems);
      const orderData = newItems.map((item, index) => ({ _id: item._id, order: index }));
      await axios.put("http://localhost:5000/api/gallery/reorder", { items: orderData });
    }
  };

  return (
    <div className="gallery-admin">
      <h2>Gallery Admin</h2>

      <div className="upload-bar">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn-upload" onClick={handleUpload}>Upload</button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map(i => i._id)} strategy={rectSortingStrategy}>
          <div className="gallery-grid">
            {images.length === 0
              ? <p className="gallery-empty">No images yet — upload one above.</p>
              : images.map((img) => (
                  <SortableItem key={img._id} id={img._id} img={img} onDelete={handleDelete} />
                ))
            }
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default AdminGallery;