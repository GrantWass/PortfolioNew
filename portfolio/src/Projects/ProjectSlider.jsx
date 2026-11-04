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
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const toggleAutoSlide = () => {
    setIsPaused((paused) => !paused);
  };

  useEffect(() => {
    const slider = document.querySelector(".slider");
    const container = document.querySelector(".main");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    if (!slider || !prevButton || !nextButton) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId;
    // If the effect re-runs while the pointer/focus is already inside,
    // stay paused instead of restarting under the user.
    let hoverPaused = container
      ? container.matches(":hover") ||
        container.contains(document.activeElement)
      : false;
    // Default to paused when the OS requests reduced motion. This runs
    // client-only inside the effect, so there is no SSR hydration mismatch.
    // The toggle lets users opt back in. Manual prev/next still work.
    if (media.matches && !isPausedRef.current) {
      setIsPaused(true);
    }

    const canAutoSlide = () =>
      !media.matches && !isPausedRef.current && !hoverPaused;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = undefined;
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      if (!canAutoSlide()) return;
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
      const activeHeading = slider.children[1]?.querySelector('h3');
      if (activeHeading) setActiveProject(activeHeading.textContent);
      startAutoSlide();
    };

    const handleEnter = () => {
      hoverPaused = true;
      stopAutoSlide();
    };

    const handleLeave = (e) => {
      // Moving focus between elements inside the slider fires focusout
      // before the next focusin; don't resume in that gap.
      if (e && e.type === "focusout" && e.relatedTarget && container.contains(e.relatedTarget)) {
        return;
      }
      hoverPaused = false;
      startAutoSlide();
    };

    const handleReducedMotionChange = () => {
      // Keep the toggle label truthful: entering reduced-motion pauses,
      // leaving it resumes (unless the user paused explicitly).
      if (media.matches) {
        if (!isPausedRef.current) setIsPaused(true);
        stopAutoSlide();
        return;
      }
      startAutoSlide();
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
    if (container) {
      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mouseleave", handleLeave);
      container.addEventListener("focusin", handleEnter);
      container.addEventListener("focusout", handleLeave);
    }
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleReducedMotionChange);
    }

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      if (container) {
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mouseleave", handleLeave);
        container.removeEventListener("focusin", handleEnter);
        container.removeEventListener("focusout", handleLeave);
      }
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", handleReducedMotionChange);
      }
      stopAutoSlide();
    };
  }, [isPaused]);
  
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
          className="btn auto-toggle"
          aria-pressed={isPaused}
          aria-label={isPaused ? "Resume automatic project rotation" : "Pause automatic project rotation"}
          onClick={toggleAutoSlide}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
      </div>
    </div>
  );
};

export default Home;
