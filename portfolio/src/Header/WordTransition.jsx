"use client";

import { useState, useEffect } from 'react';
import styles from './header.module.css';

const words = ["Software Developer", "Student", "Collegiate Runner", "Learner"];

const WordTransition = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const handleChange = (event) => setReducedMotion(event.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
      if (reducedMotion) {
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
    }, [reducedMotion]);

  return (
    <span role="status" aria-live="polite" className={`${styles.wordTransition} ${animate ? styles.animate : styles.fadeOut}`}>{words[currentWord]}</span>
  );
};

export default WordTransition;
