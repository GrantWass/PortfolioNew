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
    const slider = document.querySelector(".slider");
    const container = slider?.closest(".main") ?? slider;
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    if (!slider || !prevButton || !nextButton) return;
  
    let intervalId;
    let paused = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const autoplayAllowed = () =>
      !motionQuery.matches && !document.hidden && !paused;

    const stopAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = undefined;
    };
  
    const startAutoSlide = () => {
      stopAutoSlide();
      if (!autoplayAllowed()) return;
      intervalId = setInterval(() => {
        if (!autoplayAllowed()) return;
        nextButton.click();
      }, 8000);
    };

    const handlePause = () => {
      paused = true;
      stopAutoSlide();
    };

    const handleResume = () => {
      paused = false;
      startAutoSlide();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };

    const handleMotionChange = () => {
      startAutoSlide();
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
    container.addEventListener("mouseenter", handlePause);
    container.addEventListener("mouseleave", handleResume);
    container.addEventListener("focusin", handlePause);
    container.addEventListener("focusout", handleResume);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionChange);
  
    startAutoSlide(); 
  
    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      container.removeEventListener("mouseenter", handlePause);
      container.removeEventListener("mouseleave", handleResume);
      container.removeEventListener("focusin", handlePause);
      container.removeEventListener("focusout", handleResume);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
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
