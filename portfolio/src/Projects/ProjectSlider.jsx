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
    const container = document.querySelector(".main");
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    if (!slider || !prevButton || !nextButton) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover)");

    let intervalId;

    const isPaused = () => {
      if (hoverQuery.matches && container && container.matches(":hover")) return true;
      if (container && container.contains(document.activeElement)) return true;
      return false;
    };

    const stopAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = undefined;
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      if (reduceMotionQuery.matches) return;
      if (document.hidden) return;
      if (isPaused()) return;
      intervalId = setInterval(() => {
        if (document.hidden || isPaused()) return;
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

    const handleVisibility = () => {
      if (document.hidden) stopAutoSlide();
      else startAutoSlide();
    };

    const handleMotionChange = () => {
      if (reduceMotionQuery.matches) stopAutoSlide();
      else startAutoSlide();
    };

    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
    if (container) {
      container.addEventListener("mouseenter", stopAutoSlide);
      container.addEventListener("mouseleave", startAutoSlide);
      container.addEventListener("focusin", stopAutoSlide);
      container.addEventListener("focusout", startAutoSlide);
    }
    document.addEventListener("visibilitychange", handleVisibility);
    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", handleMotionChange);
    }

    startAutoSlide();

    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      if (container) {
        container.removeEventListener("mouseenter", stopAutoSlide);
        container.removeEventListener("mouseleave", startAutoSlide);
        container.removeEventListener("focusin", stopAutoSlide);
        container.removeEventListener("focusout", startAutoSlide);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
      if (typeof reduceMotionQuery.removeEventListener === "function") {
        reduceMotionQuery.removeEventListener("change", handleMotionChange);
      }
      stopAutoSlide();
    };
  }, []);
  
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
      </div>
    </div>
  );
};

export default Home;
