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
    const main = document.querySelector(".main");
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
  
    let intervalId;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const stopAutoSlide = () => {
      clearInterval(intervalId);
    };
  
    const startAutoSlide = () => {
      clearInterval(intervalId);
      if (prefersReduced.matches) return;
      if (main.matches(":hover")) return;
      if (main.contains(document.activeElement)) return;
      intervalId = setInterval(() => {
        // Never unmount a focused control via timer.
        if (main.matches(":hover")) return;
        if (main.contains(document.activeElement)) return;
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
  
    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);

    const handleMouseEnter = () => stopAutoSlide();
    const handleMouseLeave = () => startAutoSlide();
    const handleFocusIn = () => stopAutoSlide();
    const handleFocusOut = (e) => {
      if (!main.contains(e.relatedTarget)) startAutoSlide();
    };
    const handleMotionChange = () => {
      if (prefersReduced.matches) stopAutoSlide();
      else startAutoSlide();
    };

    main.addEventListener("mouseenter", handleMouseEnter);
    main.addEventListener("mouseleave", handleMouseLeave);
    main.addEventListener("focusin", handleFocusIn);
    main.addEventListener("focusout", handleFocusOut);
    if (typeof prefersReduced.addEventListener === "function") {
      prefersReduced.addEventListener("change", handleMotionChange);
    }
  
    startAutoSlide(); 
  
    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
      main.removeEventListener("mouseenter", handleMouseEnter);
      main.removeEventListener("mouseleave", handleMouseLeave);
      main.removeEventListener("focusin", handleFocusIn);
      main.removeEventListener("focusout", handleFocusOut);
      if (typeof prefersReduced.removeEventListener === "function") {
        prefersReduced.removeEventListener("change", handleMotionChange);
      }
      clearInterval(intervalId);
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
