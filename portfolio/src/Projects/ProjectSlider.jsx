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
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Sync paused state from the stored toggle choice and the OS reduced-motion
  // request after mount (reading window during render would hydrate-mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("project-slider-paused");
      const prefersReduced =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (stored === "1") setIsPaused(true);
      else if (stored === "0") {
        // A stored "play" choice never overrides an OS reduce-motion request on load.
        if (prefersReduced) setIsPaused(true);
      } else if (prefersReduced) {
        setIsPaused(true);
      }
    } catch {
      // Storage unavailable — fall back to motion-query default below.
      try {
        if (
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          setIsPaused(true);
        }
      } catch {
        // Ignore — autoplay with hover/focus pause remains.
      }
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("project-slider-paused", isPaused ? "1" : "0");
    } catch {
      // Storage unavailable (private mode etc.) — pause toggle still works for the session.
    }
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const slider = container.querySelector(".slider");
    const prevButton = container.querySelector(".prev");
    const nextButton = container.querySelector(".next");
    if (!slider || !prevButton || !nextButton) return;

    let intervalId;
    let hovered = false;
    let focused = false;

    const shouldRun = () => !isPaused && !hovered && !focused;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = undefined;
    };

    const startAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = undefined;
      if (!shouldRun()) return;
      intervalId = setInterval(() => {
        nextButton.click();
      }, 8000);
    };

    const activate = (e) => {
      const items = container.querySelectorAll(".item");
      if (e.target.matches(".next")) {
        slider.append(items[0]);
      } else if (e.target.matches(".prev")) {
        slider.prepend(items[items.length - 1]);
      }
      setActiveProject(slider.children[1].querySelector('h3').textContent);
      startAutoSlide();
    };

    const handleMouseEnter = () => {
      hovered = true;
      stopAutoSlide();
    };
    const handleMouseLeave = () => {
      hovered = false;
      startAutoSlide();
    };
    const handleFocusIn = () => {
      focused = true;
      stopAutoSlide();
    };
    const handleFocusOut = () => {
      focused = false;
      startAutoSlide();
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const handleMotionChange = (event) => {
      if (event.matches) setIsPaused(true);
    };
    if (mq) {
      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", handleMotionChange);
      } else if (typeof mq.addListener === "function") {
        mq.addListener(handleMotionChange);
      }
    }

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      if (mq) {
        if (typeof mq.removeEventListener === "function") {
          mq.removeEventListener("change", handleMotionChange);
        } else if (typeof mq.removeListener === "function") {
          mq.removeListener(handleMotionChange);
        }
      }
      clearInterval(intervalId);
    };
  }, [isPaused]);
  
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
          type="button"
          className="btn pause-btn"
          aria-label={isPaused ? "Play automatic slide rotation" : "Pause automatic slide rotation"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((v) => !v)}
        >
          <span aria-hidden="true">{isPaused ? "▶" : "❚❚"}</span>
        </button>
        <button className="btn next arrow" aria-label="Show next project">➔</button>
      </div>
    </div>
  );
};

export default Home;
