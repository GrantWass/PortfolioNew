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
  const mainRef = useRef(null);
  const sliderRef = useRef(null);
  const pausedRef = useRef(false);
  const hoverFocusPausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const slider = sliderRef.current;
    const main = mainRef.current;
    if (!slider || !main) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      reducedMotionRef.current = mq.matches;
    };
    syncMotion();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", syncMotion);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(syncMotion);
    }

    let intervalId;

    const updateActive = () => {
      const label = slider.children[1]?.querySelector("h3")?.textContent;
      if (label) setActiveProject(label);
    };

    const goNext = () => {
      const items = slider.querySelectorAll(".item");
      if (items.length > 0) slider.append(items[0]);
      updateActive();
    };

    const goPrev = () => {
      const items = slider.querySelectorAll(".item");
      if (items.length > 0) slider.prepend(items[items.length - 1]);
      updateActive();
    };

    const shouldPause = () =>
      pausedRef.current ||
      hoverFocusPausedRef.current ||
      reducedMotionRef.current ||
      document.hidden;

    const startAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!shouldPause()) goNext();
      }, 8000);
    };

    const activate = (e) => {
      const btn = e.target?.closest?.(".next, .prev");
      if (btn?.classList.contains("next")) {
        goNext();
      } else if (btn?.classList.contains("prev")) {
        goPrev();
      }
      startAutoSlide();
    };

    const prevButton = main.querySelector(".prev");
    const nextButton = main.querySelector(".next");

    const handleMouseEnter = () => {
      hoverFocusPausedRef.current = true;
    };
    const handleMouseLeave = () => {
      hoverFocusPausedRef.current = false;
    };
    const handleFocusIn = () => {
      hoverFocusPausedRef.current = true;
    };
    const handleFocusOut = (e) => {
      if (!main.contains(e.relatedTarget)) hoverFocusPausedRef.current = false;
    };

    prevButton?.addEventListener("click", activate);
    nextButton?.addEventListener("click", activate);
    main.addEventListener("mouseenter", handleMouseEnter);
    main.addEventListener("mouseleave", handleMouseLeave);
    main.addEventListener("focusin", handleFocusIn);
    main.addEventListener("focusout", handleFocusOut);

    startAutoSlide();

    return () => {
      prevButton?.removeEventListener("click", activate);
      nextButton?.removeEventListener("click", activate);
      main.removeEventListener("mouseenter", handleMouseEnter);
      main.removeEventListener("mouseleave", handleMouseLeave);
      main.removeEventListener("focusin", handleFocusIn);
      main.removeEventListener("focusout", handleFocusOut);
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", syncMotion);
      } else if (typeof mq.removeListener === "function") {
        mq.removeListener(syncMotion);
      }
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="main" ref={mainRef}>
      <ul className="slider" ref={sliderRef}>
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} activeProject={activeProject} />
        ))}
      </ul>
      <div className="move">
        <button className="btn prev arrow" aria-label="Show previous project">➔</button>
        <button className="btn next arrow" aria-label="Show next project">➔</button>
        <button
          type="button"
          className="btn pause"
          aria-pressed={isPaused}
          aria-label={isPaused ? "Play automatic slide rotation" : "Pause automatic slide rotation"}
          onClick={() => setIsPaused((v) => !v)}
        >
          {isPaused ? "▶" : "❚❚"}
        </button>
      </div>
    </div>
  );
};

export default Home;
