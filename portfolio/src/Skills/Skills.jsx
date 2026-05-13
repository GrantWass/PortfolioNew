"use client";
import React from "react";
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
  FaCalculator,
  FaRandom,
  FaDice,
  FaUserCog,
  FaCloud,
  FaChartBar,
  FaCube,
  FaCubes,
  FaFireAlt,
  FaExchangeAlt,
  FaRegCheckSquare,
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

const categories = [
  {
    id: "webdev",
    category: "Web Development",
    icon: <MdOutlineComputer size={20} />,
    accentColor: "#0ea5e9",
    skills: [
      { name: "HTML", icon: <FaHtml5 size={15} />, color: "#E34F26" },
      { name: "CSS", icon: <FaCss3Alt size={15} />, color: "#1572B6" },
      { name: "JavaScript", icon: <FaJs size={15} />, color: "#c9a800" },
      { name: "React", icon: <FaReact size={15} />, color: "#0ea5e9" },
      { name: "TypeScript", icon: <SiTypescript size={15} />, color: "#007ACC" },
      { name: "Next.js", icon: <SiNextdotjs size={15} />, color: "#333" },
    ],
  },
  {
    id: "backend",
    category: "Backend Development",
    icon: <FaUserCog size={20} />,
    accentColor: "#10b981",
    skills: [
      { name: "Node.js", icon: <FaNode size={15} />, color: "#339933" },
      { name: "SQL", icon: <FaDatabase size={15} />, color: "#336791" },
      { name: "Java", icon: <FaJava size={15} />, color: "#007396" },
      { name: "C#", icon: <SiCsharp size={15} />, color: "#239120" },
      { name: ".NET", icon: <SiDotnet size={15} />, color: "#512BD4" },
    ],
  },
  {
    id: "mlai",
    category: "ML & AI",
    icon: <LuBrainCircuit size={20} />,
    accentColor: "#8b5cf6",
    skills: [
      { name: "Python", icon: <FaPython size={15} />, color: "#3776AB" },
      { name: "TensorFlow", icon: <SiTensorflow size={15} />, color: "#FF6F00" },
      { name: "Pandas", icon: <SiPandas size={15} />, color: "#150458" },
      { name: "Scikit-Learn", icon: <SiScikitlearn size={15} />, color: "#F7931E" },
      { name: "Neural Nets", icon: <FaBrain size={15} />, color: "#8E44AD" },
      { name: "Apache Spark", icon: <FaFireAlt size={15} />, color: "#E25A1C" },
    ],
  },
  {
    id: "cloud",
    category: "Cloud & Infra",
    icon: <FaCloud size={20} />,
    accentColor: "#f59e0b",
    skills: [
      { name: "AWS", icon: <FaAws size={15} />, color: "#FF9900" },
      { name: "Docker", icon: <FaDocker size={15} />, color: "#2496ED" },
      { name: "MongoDB", icon: <SiMongodb size={15} />, color: "#47A248" },
      { name: "MySQL", icon: <SiSqlite size={15} />, color: "#003B57" },
      { name: "Vercel", icon: <SiVercel size={15} />, color: "#333" },
    ],
  },
  {
    id: "math",
    category: "Mathematics",
    icon: <FaCalculator size={20} />,
    accentColor: "#ef4444",
    skills: [
      { name: "Probability", icon: <FaDice size={15} />, color: "#E74C3C" },
      { name: "Stochastic", icon: <FaRandom size={15} />, color: "#27AE60" },
      { name: "Linear Algebra", icon: <FaSuperscript size={15} />, color: "#2980B9" },
      { name: "Proofs", icon: <FaRegCheckSquare size={15} />, color: "#4C8CBF" },
      { name: "Statistics", icon: <FaChartBar size={15} />, color: "#336791" },
    ],
  },
  {
    id: "data",
    category: "Data Engineering",
    icon: <FaChartBar size={20} />,
    accentColor: "#06b6d4",
    skills: [
      { name: "SQL", icon: <FaDatabase size={15} />, color: "#336791" },
      { name: "Hadoop", icon: <FaCube size={15} />, color: "#44aacc" },
      { name: "NoSQL", icon: <FaDatabase size={15} />, color: "#4DB33D" },
      { name: "Big Data", icon: <FaCubes size={15} />, color: "#9B59B6" },
      { name: "Cassandra", icon: <FaDatabase size={15} />, color: "#1287B1" },
      { name: "Kafka", icon: <FaExchangeAlt size={15} />, color: "#555" },
    ],
  },
];

export default function SkillGraph() {
  return (
    <div className={styles.bentoGrid}>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`${styles.bentoCard} ${styles[cat.id]}`}
          style={{ "--accent": cat.accentColor }}
        >
          <div className={styles.cardHeader}>
            <span className={styles.categoryIcon} style={{ color: cat.accentColor }}>
              {cat.icon}
            </span>
            <h3 className={styles.categoryTitle}>{cat.category}</h3>
          </div>
          <div className={styles.skillsWrap}>
            {cat.skills.map((skill) => (
              <div key={skill.name} className={styles.skillChip}>
                <span style={{ color: skill.color, display: "flex", alignItems: "center" }}>
                  {skill.icon}
                </span>
                <span className={styles.chipLabel}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
