"use client";

import { useState, useEffect } from 'react';
import styles from './header.module.css';

const words = ["Software Developer", "Student", "Collegiate Runner", "Avid Learner"];

const WordTransition = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const [animate, setAnimate] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setAnimate(false); 
        setTimeout(() => {
          setAnimate(true);
          setCurrentWord((prevWord) => (prevWord + 1) % words.length);
        }, 500); 
      }, 4000); 
  
      return () => clearInterval(interval);
    }, [words.length]);

  return (
    <span className={`${styles.wordTransition} ${animate ? styles.animate : styles.fadeOut}`}>{words[currentWord]}</span>
  );
};

export default WordTransition;
