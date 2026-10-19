"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPython, FaAws } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiVercel,
  SiSupabase,
  SiStripe,
  SiOpenai,
} from "react-icons/si";
import Project from "./Project";
import "./projectSlider.css";

const projects = [
  {
    title: "Run Tracker",
    image: "/heatmap.png",
    slug: "run-tracker",
    technologies: [
      { icon: <SiReact />, color: "#61DAFB" },
      { icon: <SiJavascript />, color: "#F7DF1E" },
      { icon: <FaPython />, color: "#3776AB" },
    ],
  },
  {
    title: "Secret Gitler",
    image: "/defaultGame.png",
    slug: "secret-gitler",
    technologies: [
      { icon: <SiReact />, color: "#61DAFB" },
      { icon: <SiTypescript />, color: "#007ACC" },
      { icon: <SiMongodb />, color: "#47A248" },
    ],
  },
  {
    title: "Interactive Neural Network",
    image: "/nn.png",
    slug: "neural-network",
    technologies: [
      { icon: <SiReact />, color: "#61DAFB" },
      { icon: <SiJavascript />, color: "#F7DF1E" },
      { icon: <FaPython />, color: "#3776AB" },
      { icon: <FaAws />, color: "#FF9900" },
    ],
  },
  {
    title: "Travela",
    image: "/travela_trip.png",
    slug: "travela",
    technologies: [
      { icon: <SiNextdotjs />, color: "#000000" },
      { icon: <SiVercel />, color: "#000000" },
    ],
  },
  {
    title: "Ultron",
    image: "/ultron_home.png",
    slug: "ultron",
    technologies: [
      { icon: <SiTypescript />, color: "#007ACC" },
      { icon: <SiNextdotjs />, color: "#000000" },
      { icon: <SiSupabase />, color: "#3ECF8E" },
      { icon: <SiStripe />, color: "#635BFF" },
      { icon: <SiOpenai />, color: "#412991" },
      { icon: <FaAws />, color: "#FF9900" },
    ],
  },
  {
    title: "Old Portfolio",
    image: "/old1.png",
    slug: "old-portfolio",
    technologies: [
      { icon: <SiReact />, color: "#61DAFB" },
      { icon: <SiJavascript />, color: "#F7DF1E" },
      { icon: <SiNextdotjs />, color: "#000000" },
      { icon: <FaAws />, color: "#FF9900" },
    ],
  },
];

const Home = () => {
  const [activeProject, setActiveProject] = useState("Run Tracker");
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const controlsRef = useRef({ start: () => {}, stop: () => {} });

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = document.querySelector(".main");
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let intervalId;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;
    if (media.matches) {
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
    const onMediaChange = (e) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        clearInterval(intervalId);
        intervalId = undefined;
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    };
    if (media.addEventListener) {
      media.addEventListener("change", onMediaChange);
    } else {
      media.addListener(onMediaChange);
    }

    const shouldAdvance = () =>
      isPlayingRef.current &&
      !reducedMotionRef.current &&
      !hoveredRef.current &&
      !focusedRef.current;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = undefined;
    };
  
    const startAutoSlide = () => {
      stopAutoSlide();
      if (!shouldAdvance()) return;
      intervalId = setInterval(() => {
        if (shouldAdvance()) {
          nextButton.click();
        }
      }, 8000);
    };
  
    const activate = (e) => {
      const items = document.querySelectorAll(".item");
      if (e.target.matches(".next")) {
        slider.append(items[0]);
      } else if (e.target.matches(".prev")) {
        slider.prepend(items[items.length - 1]);
      }
      setActiveProject(slider.children[1].querySelector('h3').textContent);
      startAutoSlide(); 
    };
  
    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);

    const handleMouseEnter = () => {
      hoveredRef.current = true;
      stopAutoSlide();
    };
    const handleMouseLeave = () => {
      hoveredRef.current = false;
      startAutoSlide();
    };
    const handleFocusIn = () => {
      focusedRef.current = true;
      stopAutoSlide();
    };
    const handleFocusOut = (e) => {
      if (e.relatedTarget && container.contains(e.relatedTarget)) return;
      focusedRef.current = false;
      startAutoSlide();
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    controlsRef.current = { start: startAutoSlide, stop: stopAutoSlide };
  
    startAutoSlide(); 
  
    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      if (media.removeEventListener) {
        media.removeEventListener("change", onMediaChange);
      } else {
        media.removeListener(onMediaChange);
      }
      stopAutoSlide();
    };
  }, []);
  
  const toggleAutoPlay = () => {
    const next = !isPlayingRef.current;
    // Respect reduced-motion: do not allow opting back into auto-advance.
    if (reducedMotionRef.current && next) return;
    isPlayingRef.current = next;
    setIsPlaying(next);
    if (next) {
      controlsRef.current.start();
    } else {
      controlsRef.current.stop();
    }
  };
  
  return (
    <div className="main">
      <ul className="slider">
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} activeProject={activeProject} />
        ))}
      </ul>
      <div className="move">
        <button className="btn prev arrow" aria-label="Show previous project">➔</button>
        <button className="btn next arrow" aria-label="Show next project">➔</button>
        <button
          type="button"
          className="btn autoplay"
          aria-label={isPlaying ? "Pause project auto-advance" : "Play project auto-advance"}
          aria-pressed={!isPlaying}
          onClick={toggleAutoPlay}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default Home;
