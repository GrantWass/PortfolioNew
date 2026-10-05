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
  
  useEffect(() => {
    const root = document.querySelector(".project-slider");
    const slider = root ? root.querySelector(".slider") : document.querySelector(".slider");
    const prevButton = root ? root.querySelector(".prev") : document.querySelector(".prev");
    const nextButton = root ? root.querySelector(".next") : document.querySelector(".next");
    const pauseButton = root ? root.querySelector(".pause-btn") : document.querySelector(".pause-btn");
    if (!slider || !prevButton || !nextButton) return;
    // Hover/focus pause target: the whole slider region (arrows, pause
    // toggle, and slide links/buttons).
    const pauseTarget = root || slider;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let userPaused = false;
    let hoverPaused = false;
    let focusPaused = false;
    let intervalId;

    const isRunnable = () =>
      !userPaused &&
      !hoverPaused &&
      !focusPaused &&
      !document.hidden &&
      !mediaQuery.matches;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
    };

    const syncPauseButton = () => {
      if (!pauseButton) return;
      if (mediaQuery.matches) {
        pauseButton.disabled = true;
        pauseButton.removeAttribute("aria-pressed");
        pauseButton.setAttribute(
          "aria-label",
          "Automatic slide rotation is off to respect your reduced-motion setting"
        );
        pauseButton.textContent = "Auto-rotation off";
        return;
      }
      pauseButton.disabled = false;
      pauseButton.setAttribute("aria-pressed", String(userPaused));
      pauseButton.setAttribute(
        "aria-label",
        userPaused ? "Play automatic slide rotation" : "Pause automatic slide rotation"
      );
      pauseButton.textContent = userPaused ? "▶ Play" : "❚❚ Pause";
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      if (!isRunnable()) {
        syncPauseButton();
        return;
      }
      intervalId = setInterval(() => {
        nextButton.click();
      }, 8000);
      syncPauseButton();
    };

    const togglePaused = () => {
      // Never auto-advance for users who prefer reduced motion.
      if (mediaQuery.matches) return;
      userPaused = !userPaused;
      syncPauseButton();
      if (userPaused) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };

    const activate = (e) => {
      const items = slider.querySelectorAll(".item");
      if (e.target.matches(".next")) {
        slider.append(items[0]);
      } else if (e.target.matches(".prev")) {
        slider.prepend(items[items.length - 1]);
      }
      setActiveProject(slider.children[1].querySelector('h3').textContent);
      startAutoSlide();
    };

    const onMouseEnter = () => {
      hoverPaused = true;
      stopAutoSlide();
    };
    const onMouseLeave = () => {
      hoverPaused = false;
      startAutoSlide();
    };
    const onFocusIn = () => {
      focusPaused = true;
      stopAutoSlide();
    };
    const onFocusOut = (e) => {
      // Ignore focus moving between elements inside the slider.
      if (e.relatedTarget && pauseTarget.contains(e.relatedTarget)) return;
      focusPaused = false;
      startAutoSlide();
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };
    const onMotionChange = () => {
      if (mediaQuery.matches) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
      syncPauseButton();
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
    if (pauseButton) pauseButton.addEventListener("click", togglePaused);
    pauseTarget.addEventListener("mouseenter", onMouseEnter);
    pauseTarget.addEventListener("mouseleave", onMouseLeave);
    pauseTarget.addEventListener("focusin", onFocusIn);
    pauseTarget.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onMotionChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(onMotionChange);
    }

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      if (pauseButton) pauseButton.removeEventListener("click", togglePaused);
      pauseTarget.removeEventListener("mouseenter", onMouseEnter);
      pauseTarget.removeEventListener("mouseleave", onMouseLeave);
      pauseTarget.removeEventListener("focusin", onFocusIn);
      pauseTarget.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", onMotionChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(onMotionChange);
      }
      stopAutoSlide();
    };
  }, []);
  
  return (
    <div className="main project-slider">
      <ul className="slider">
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} activeProject={activeProject} />
        ))}
      </ul>
      <div className="move">
        <button className="btn prev arrow" aria-label="Show previous project">➔</button>
        <button className="btn next arrow" aria-label="Show next project">➔</button>
        <button type="button" className="btn pause-btn" aria-pressed="false" aria-label="Pause automatic slide rotation">❚❚ Pause</button>
      </div>
    </div>
  );
};

export default Home;
