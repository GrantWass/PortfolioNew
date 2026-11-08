"use client";
import React, { useEffect, useState } from "react";
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = React.useRef(null);
  const hoverFocusPausedRef = React.useRef(false);
  const manualPausedRef = React.useRef(false);
  const autoControlRef = React.useRef({ stop: () => {}, start: () => {} });

  useEffect(() => {
    manualPausedRef.current = isPaused;
    if (isPaused) {
      autoControlRef.current.stop();
    } else {
      autoControlRef.current.start();
    }
  }, [isPaused]);

  useEffect(() => {
    const container = document.querySelector(".main");
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    const stopAutoSlide = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const canAutoSlide = () =>
      !manualPausedRef.current &&
      !hoverFocusPausedRef.current &&
      document.visibilityState === "visible";

    const startAutoSlide = () => {
      stopAutoSlide();
      if (!canAutoSlide()) return;
      intervalRef.current = setInterval(() => {
        nextButton.click();
      }, 8000);
    };
    autoControlRef.current = { stop: stopAutoSlide, start: startAutoSlide };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReducedMotion = (event) => {
      const matches =
        event && typeof event.matches === "boolean"
          ? event.matches
          : mediaQuery.matches;
      setPrefersReducedMotion(matches);
      if (matches) {
        // Never auto-advance on load (or when Reduce Motion is enabled
        // mid-session): park the slider paused and let the user opt back in
        // explicitly via the pause/play control.
        manualPausedRef.current = true;
        setIsPaused(true);
        stopAutoSlide();
      }
    };
    applyReducedMotion();

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

    const pauseForInteraction = () => {
      hoverFocusPausedRef.current = true;
      stopAutoSlide();
    };

    const resumeAfterInteraction = (e) => {
      // For focusout, only resume when focus truly leaves the slider.
      if (e && e.relatedTarget && container.contains(e.relatedTarget)) return;
      hoverFocusPausedRef.current = false;
      startAutoSlide();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);

    container.addEventListener("mouseenter", pauseForInteraction);
    container.addEventListener("mouseleave", resumeAfterInteraction);
    container.addEventListener("focusin", pauseForInteraction);
    container.addEventListener("focusout", resumeAfterInteraction);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", applyReducedMotion);
    }

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      container.removeEventListener("mouseenter", pauseForInteraction);
      container.removeEventListener("mouseleave", resumeAfterInteraction);
      container.removeEventListener("focusin", pauseForInteraction);
      container.removeEventListener("focusout", resumeAfterInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", applyReducedMotion);
      }
      stopAutoSlide();
    };
  }, []);

  const togglePaused = () => {
    setIsPaused((prev) => !prev);
  };

  const pauseTitle = isPaused
    ? prefersReducedMotion
      ? "Play (auto-rotation is off: reduced motion)"
      : "Play"
    : "Pause";

  return (
    <div className="main">
      <ul className="slider">
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} activeProject={activeProject} />
        ))}
      </ul>
      <div className="move">
        <button className="btn prev arrow" aria-label="Show previous project">➔</button>
        <button
          type="button"
          className="btn pause"
          aria-pressed={isPaused}
          aria-label={isPaused ? "Play automatic slide rotation" : "Pause automatic slide rotation"}
          title={pauseTitle}
          onClick={togglePaused}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
        <button className="btn next arrow" aria-label="Show next project">➔</button>
      </div>
    </div>
  );
};

export default Home;
