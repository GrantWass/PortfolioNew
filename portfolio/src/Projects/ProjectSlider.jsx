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
  const [userPaused, setUserPaused] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);
  const containerRef = useRef(null);
  const hoverPausedRef = useRef(false);
  const pausedRef = useRef(false);

  const autoplayPaused = userPaused || motionReduced;

  useEffect(() => {
    const container = containerRef.current;
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    if (!container || !slider || !prevButton || !nextButton) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Sync the imperative timer guard before the first startAutoSlide() call
    // so a reduced-motion preference never starts the timer, even on mount.
    pausedRef.current = userPaused || media.matches;
    setMotionReduced(media.matches);

    let intervalId;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
    };

    const startAutoSlide = () => {
      clearInterval(intervalId);
      if (pausedRef.current || hoverPausedRef.current || document.hidden) return;
      intervalId = setInterval(() => {
        nextButton.click();
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

    const handleMouseEnter = () => {
      hoverPausedRef.current = true;
      stopAutoSlide();
    };
    const handleMouseLeave = () => {
      hoverPausedRef.current = false;
      startAutoSlide();
    };
    const handleFocusIn = () => {
      hoverPausedRef.current = true;
      stopAutoSlide();
    };
    const handleFocusOut = (e) => {
      if (e.currentTarget.contains(e.relatedTarget)) return;
      hoverPausedRef.current = false;
      startAutoSlide();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };
    const handleMotionChange = (e) => {
      setMotionReduced(e.matches);
      pausedRef.current = userPaused || e.matches;
      if (e.matches) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    media.addEventListener("change", handleMotionChange);

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      media.removeEventListener("change", handleMotionChange);
      clearInterval(intervalId);
    };
  }, [userPaused]);

  return (
    <div className="main" ref={containerRef}>
      <ul className="slider">
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} activeProject={activeProject} />
        ))}
      </ul>
      <div className="move">
        <button className="btn prev arrow" aria-label="Show previous project">➔</button>
        <button
          className="btn autoplay"
          type="button"
          aria-pressed={autoplayPaused}
          aria-label={autoplayPaused ? "Play automatic slide rotation" : "Pause automatic slide rotation"}
          onClick={() => setUserPaused((v) => !v)}
        >
          {autoplayPaused ? "▶" : "❚❚"}
        </button>
        <button className="btn next arrow" aria-label="Show next project">➔</button>
      </div>
    </div>
  );
};

export default Home;
