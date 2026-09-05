"use client"; 

import { useEffect, useRef, useState } from "react";
import styles from "./project.module.css";

export default function Lightbox({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const thumbnailRefs = useRef([]);
  const closeButtonRef = useRef(null);
  const lastFocusedIndex = useRef(null);

  const openImage = (src, index) => {
    lastFocusedIndex.current = index;
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!selectedImage) return;
    closeButtonRef.current?.focus();
    const thumbnails = thumbnailRefs.current;
    const focusedIndex = lastFocusedIndex.current;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (focusedIndex != null) {
        thumbnails[focusedIndex]?.focus();
      }
    };
  }, [selectedImage]);

  return (
    <div>
      <div className={styles.imageGallery}>
        {images.map((src, index) => (
          <button
            key={index}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
            type="button"
            className={styles.thumbnailButton}
            onClick={() => openImage(src, index)}
            aria-label={`Open image ${index + 1} enlarged`}
          >
            <img
              src={src}
              alt={`Project Image ${index + 1}`}
              className={styles.image}
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className={styles.modal}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedImage} alt="Enlarged view" className={styles.modalImage} />
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              onClick={closeModal}
              aria-label="Close image viewer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
