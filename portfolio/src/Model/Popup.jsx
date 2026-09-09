'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './popup.module.css';

const Popup = ({ title, description, images, onClose }) => {
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  const handleBackdropKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCloseRef.current();
    }
  };

  return (
    <>
      <div
        className={styles.popupBackdrop}
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close dialog"
        onKeyDown={handleBackdropKeyDown}
      ></div>
      <div className={styles.popup} role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <div className={styles.popupContent}>
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >✖</button>
          <h3 id="popup-title" className={styles.popupTitle}>{title}</h3>
          <p className={styles.popupDescription}>{description}</p>
          {images && images.length > 0 && (
            <div className={styles.popupImages}>
              {images.map((src, index) => (
                <div key={index} className={styles.popupImageWrapper}>
                  <Image
                    src={src}
                    alt={`Popup image ${index + 1}`}
                    layout="responsive"
                    width={150}
                    height={150}
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Popup;
