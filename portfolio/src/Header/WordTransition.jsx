"use client";

import { useState, useEffect } from 'react';
import styles from './header.module.css';

const words = ["Software Developer", "Student", "Collegiate Runner", "Learner"];

const WordTransition = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);
  
    useEffect(() => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReducedMotion(true);
        return;
      }
      let timeout;
      const interval = setInterval(() => {
        setAnimate(false); 
        timeout = setTimeout(() => {
          setAnimate(true);
          setCurrentWord((prevWord) => (prevWord + 1) % words.length);
        }, 500); 
      }, 4000); 
  
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, []);

  if (reducedMotion) {
    return (
      <span className={styles.wordTransition}>{words[0]}</span>
    );
  }

  return (
    <span className={`${styles.wordTransition} ${animate ? styles.animate : styles.fadeOut}`}>{words[currentWord]}</span>
  );
};

export default WordTransition;
