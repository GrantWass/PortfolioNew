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
  const containerRef = useRef(null);

  // WCAG 2.2.2: users who prefer reduced motion get no auto-advance by default.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const slider = container?.querySelector(".slider");
    const prevButton = container?.querySelector(".prev");
    const nextButton = container?.querySelector(".next");
    if (!container || !slider || !prevButton || !nextButton) return;

    let intervalId;
    let hoverOrFocusPaused = false;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      if (!isPlaying || hoverOrFocusPaused) return;
      intervalId = setInterval(() => {
        nextButton.click();
      }, 8000);
    };

    const activate = (e) => {
      const items = slider.querySelectorAll(".item");
      if (e.target.matches(".next")) {
        slider.append(items[0]);
      } else if (e.target.matches(".prev")) {
        slider.prepend(items[items.length - 1]);
      } else {
        return;
      }
      const current = slider.children[1]?.querySelector("h3");
      if (current) setActiveProject(current.textContent);
      startAutoSlide();
    };

    const handleMouseEnter = () => {
      hoverOrFocusPaused = true;
      stopAutoSlide();
    };

    const handleMouseLeave = () => {
      hoverOrFocusPaused = false;
      startAutoSlide();
    };

    const handleFocusIn = () => {
      hoverOrFocusPaused = true;
      stopAutoSlide();
    };

    const handleFocusOut = (e) => {
      // Focus moving between slides/controls keeps the carousel paused.
      if (e.relatedTarget && container.contains(e.relatedTarget)) return;
      hoverOrFocusPaused = false;
      startAutoSlide();
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      stopAutoSlide();
    };
  }, [isPlaying]);

  return (
    <div className="main" ref={containerRef}>
      <ul className="slider" aria-label="Projects carousel">
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
          aria-label={isPlaying ? "Pause automatic slide rotation" : "Play automatic slide rotation"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((p) => !p)}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default Home;
