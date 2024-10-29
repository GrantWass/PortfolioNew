"use client"; 

import { useState } from "react";
import styles from "./project.module.css";

export default function Lightbox({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className={styles.imageGallery}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Project Image ${index + 1}`}
            className={styles.image}
            onClick={() => openImage(src)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={selectedImage} alt="Enlarged view" className={styles.modalImage} />
            <span className={styles.close} onClick={closeModal}>&times;</span>
          </div>
        </div>
      )}
    </div>
  );
}
