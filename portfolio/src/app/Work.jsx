"use client";  
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaReact, FaUnity } from "react-icons/fa";
import { SiJavascript, SiDotnet, SiCsharp } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import styles from "./home.module.css";

const ExperienceCard = () => {
  const router = useRouter();

  const experiences = [
    {
      role: "Software Developer",
      company: "Speedway Motors",
      type: "Internship",
      dates: "May 2024 - May 2025",
      image: "/speedway.jpg",
      technologies: [
        { icon: <FaReact />, color: "#61DAFB" },
        { icon: <SiJavascript />, color: "#F7DF1E" },
        { icon: <TbSql />, color: "#F29111" },
        { icon: <SiCsharp />, color: "#239120" },
        { icon: <SiDotnet />, color: "#512BD4" },
      ],
      link: "/speedway",
    },
    {
      role: "Software Engineer",
      company: "Kiewit",
      type: "Design Studio",
      dates: "August 2024 - May 2025",
      image: "/kiewit.png",
      technologies: [
        { icon: <SiCsharp />, color: "#239120" },
        { icon: <FaUnity />, color: "#100000" },
      ],
      link: "/kiewit",
    },
  ];

  const handleCardClick = (link) => {
    router.push(link);
  };

  return (
    <div className={styles.grid}>
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => handleCardClick(exp.link)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.imageContainer}>
            <Image src={exp.image} alt={`${exp.company} logo`} fill />
          </div>
          <div className={styles.cardHeader}>
            <h3>
              {exp.role} at {exp.company}
            </h3>
            <p className={styles.internship}>{exp.type}</p>
            <p className={styles.dates}>{exp.dates}</p>
          </div>
          <div className={styles.technologies}>
            {exp.technologies.map((tech, idx) => (
              <span key={idx} style={{ color: tech.color }}>
                {tech.icon}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceCard;
