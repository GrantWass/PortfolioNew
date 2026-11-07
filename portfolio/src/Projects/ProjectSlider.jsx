"use client";
import React, { useCallback, useEffect, useState } from "react";
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

const AUTOPLAY_MS = 8000;

const Home = () => {
  // Order of project indexes; the visible slide is order[1], matching the
  // previous DOM behavior (slider.children[1]).
  const [order, setOrder] = useState(() => projects.map((_, i) => i));
  const [userPaused, setUserPaused] = useState(false);
  const [hoverFocusPaused, setHoverFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goNext = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  const goPrev = useCallback(() => {
    setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  }, []);

  const autoplayPaused = userPaused || hoverFocusPaused || reducedMotion;

  useEffect(() => {
    if (autoplayPaused) return;
    const intervalId = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(intervalId);
  }, [autoplayPaused, goNext]);

  const activeProject = projects[order[1]].title;
  const paused = autoplayPaused;

  return (
    <div
      className="main"
      onMouseEnter={() => setHoverFocusPaused(true)}
      onMouseLeave={() => setHoverFocusPaused(false)}
      onFocus={() => setHoverFocusPaused(true)}
      onBlur={() => setHoverFocusPaused(false)}
    >
      <p className="sr-only" aria-live="polite">
        Showing project {activeProject}
      </p>
      <ul className="slider" aria-label="Featured projects">
        {order.map((projectIndex) => {
          const project = projects[projectIndex];
          return (
            <Project
              key={project.slug}
              project={project}
              index={projectIndex}
              activeProject={activeProject}
            />
          );
        })}
      </ul>
      <div className="move">
        <button
          type="button"
          className="btn prev arrow"
          aria-label="Show previous project"
          onClick={goPrev}
        >
          ➔
        </button>
        <button
          type="button"
          className="btn next arrow"
          aria-label="Show next project"
          onClick={goNext}
        >
          ➔
        </button>
        <button
          type="button"
          className="btn autoplay"
          aria-label={paused ? "Play project slideshow" : "Pause project slideshow"}
          aria-pressed={paused}
          onClick={() => setUserPaused((p) => !p)}
        >
          {paused ? "▶" : "⏸"}
        </button>
      </div>
    </div>
  );
};

export default Home;
