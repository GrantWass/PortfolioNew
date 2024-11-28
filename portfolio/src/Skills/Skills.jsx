"use client";
import React, { useState } from "react";
import { MdOutlineComputer } from "react-icons/md";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaPython,
  FaDatabase,
  FaDocker,
  FaAws,
  FaJava,
  FaSuperscript,
  FaBrain,
  FaChartLine,
  FaRandom,
  FaDice,
  FaUserCog,
  FaCloud,
} from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import {
  SiMongodb,
  SiTypescript,
  SiTensorflow,
  SiPandas,
  SiCsharp,
  SiSqlite,
  SiDotnet,
  SiNextdotjs,
  SiScikitlearn,
  SiVercel,
} from "react-icons/si";
import styles from "./skills.module.css";

export default function SkillGraph() {
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState(null);

  const handleCentralNodeClick = (index) => {
    setExpandedCategoryIndex(index === expandedCategoryIndex ? null : index);
  };

  const categories = [
    {
      category: "Web Development",
      icon: <MdOutlineComputer size={180} />,
      skills: [
        { name: "HTML", icon: <FaHtml5 size={30} />, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt size={30} />, color: "#1572B6" },
        { name: "JavaScript", icon: <FaJs size={30} />, color: "#F7DF1E" },
        { name: "React", icon: <FaReact size={30} />, color: "#61DAFB" },
        { name: "TypeScript", icon: <SiTypescript size={30} />, color: "#007ACC" },
        { name: "Next.js", icon: <SiNextdotjs size={30} />, color: "#000000" },
      ],
    },
    {
      category: "Backend Development",
      icon: <FaUserCog size={180} />,
      skills: [
        { name: "Node.js", icon: <FaNode size={30} />, color: "#339933" },
        { name: "SQL", icon: <FaDatabase size={30} />, color: "#336791" },
        { name: "Java", icon: <FaJava size={30} />, color: "#007396" },
        { name: "C#", icon: <SiCsharp size={30} />, color: "#239120" },
        { icon: <SiDotnet size={40} />, color: "#512BD4" },
      ],
    },
    {
      category: "ML & AI",
      icon: <LuBrainCircuit size={180} />,
      skills: [
        { name: "Python", icon: <FaPython size={30} />, color: "#3776AB" },
        { name: "TensorFlow", icon: <SiTensorflow size={30} />, color: "#FF6F00" },
        { name: "Pandas", icon: <SiPandas size={30} />, color: "#150458" },
        { name: "Sci-kit Learn", icon: <SiScikitlearn size={30} />, color: "#F7931E" },
        { name: "Neural Networks", icon: <FaBrain size={30} />, color: "#8E44AD" },
      ],
    },
    {
      category: "Cloud & Infrastructure",
      icon: <FaCloud size={180} />,
      skills: [
        { name: "AWS", icon: <FaAws size={30} />, color: "#FF9900" },
        { name: "Docker", icon: <FaDocker size={30} />, color: "#2496ED" },
        { name: "MongoDB", icon: <SiMongodb size={30} />, color: "#47A248" },
        { name: "SQLite", icon: <SiSqlite size={30} />, color: "#003B57" },
        { name: "Vercel", icon: <SiVercel size={30} />, color: "#000000" },
      ],
    },
    {
      category: "Data & Math",
      icon: <FaChartLine size={180} />,
      skills: [
        { name: "Probability", icon: <FaDice size={30} />, color: "#E74C3C" },
        { name: "Stochastic Processes", icon: <FaRandom size={30} />, color: "#27AE60" },
        { name: "Linear Algebra", icon: <FaSuperscript size={30} />, color: "#2980B9" },
        { name: "Matplotlib", icon: <FaPython size={30} />, color: "#4C8CBF" },
        { name: "SQL", icon: <FaDatabase size={30} />, color: "#336791" },
      ],
    },
  ];

  return (
    <div className={styles.skillGraphContainer}>
      {categories.map((category, index) => (
        <div
          key={index}
          className={`${styles.categoryContainer} ${expandedCategoryIndex === index ? styles.expanded : ""}`}
        >
          <div
            className={styles.centralNode}
            onClick={() => handleCentralNodeClick(index)}
            style={{
              transform: expandedCategoryIndex === index ? "scale(0.7)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
          >
            <div className={styles.categoryIcon}>{category.icon}</div>
            <h2>{category.category}</h2>
          </div>

          <div
            className={`${styles.circularLayout} ${
              expandedCategoryIndex === index ? styles.expanded : ""
            }`}
          >
            {category.skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className={styles.skillNode}
                style={{
                  transform: `rotate(${(360 / category.skills.length) * skillIndex}deg) translate(${expandedCategoryIndex === index ? "175px" : "0"}) rotate(-${(360 / category.skills.length) * skillIndex}deg)`,
                  color: skill.color,
                }}
              >
                <div>{skill.icon}</div>
                {skill.name && <div className={styles.skillName}>{skill.name}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
