"use client";
import React, { useEffect, useState } from "react";
import { FaPython, FaAws } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiNextdotjs,
  SiDotnet,
  SiTypescript,
  SiCsharp,
  SiMongodb,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import Project from "./Project";
import "./projectSlider.css";

const projects = [
  {
    title: "ScheduleLocal",
    image: "/scheduleLocal.png",
    slug: "schedulelocal",
    technologies: [
      { icon: <SiReact />, color: "#61DAFB" },
      { icon: <SiJavascript />, color: "#F7DF1E" },
      { icon: <SiNextdotjs />, color: "#000000" },
      { icon: <TbSql />, color: "#F29111" },
      { icon: <SiCsharp />, color: "#239120" },
      { icon: <SiDotnet />, color: "#512BD4" },
    ],
  },
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
    title: "Stock Analysis",
    image: "/forecast.png",
    slug: "stock-analysis",
    technologies: [
      { icon: <SiReact />, color: "#61DAFB" },
      { icon: <SiJavascript />, color: "#F7DF1E" },
      { icon: <SiCsharp />, color: "#239120" },
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
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
  
    let intervalId;
  
    const startAutoSlide = () => {
      clearInterval(intervalId);
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
  
    prevButton.addEventListener("click", activate);
    nextButton.addEventListener("click", activate);
  
    startAutoSlide(); 
  
    return () => {
      prevButton.removeEventListener("click", activate);
      nextButton.removeEventListener("click", activate);
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
        <button className="btn prev arrow">➔</button>
        <button className="btn next arrow">➔</button>
      </div>
    </div>
  );
};

export default Home;
