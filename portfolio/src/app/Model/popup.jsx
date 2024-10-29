import React from 'react';
import Image from 'next/image';
import styles from './popup.module.css';

const Popup = ({ title, description, images, onClose }) => {
  return (
    <>
      <div className={styles.popupBackdrop} onClick={onClose}></div>
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onClose}>✖</button>
          <h3 className={styles.popupTitle}>{title}</h3>
          <p className={styles.popupDescription}>{description}</p>
          {images && images.length > 0 && (
            <div className={styles.popupImages}>
              {images.map((src, index) => (
                <div key={index} className={styles.popupImageWrapper}>
                  <Image
                    src={src}
                    alt={`Popup image ${index + 1}`}
                    layout="responsive"
                    width={100}
                    height={100}
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
