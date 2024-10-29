"use client"; 
import { useRouter } from "next/navigation";
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
import dynamic from "next/dynamic";
import styles from "./home.module.css";
import Image from "next/image";

const ThreeDModel = dynamic(() => import("./Model/deskModel"), {
  ssr: false,
});

const projects = [
  // {
  //   title: "ScheduleLocal",
  //   image: "/parser.png",
  //   slug: "schedulelocal",
  //   technologies: [
  //     { icon: <SiReact />, color: "#61DAFB" },
  //     { icon: <SiJavascript />, color: "#F7DF1E" },
  //     { icon: <SiNextdotjs />, color: "#000000" },
  //     { icon: <TbSql />, color: "#F29111" },
  //     { icon: <SiCsharp />, color: "#239120" },
  //     { icon: <SiDotnet />, color: "#512BD4" },
  //   ],
  // },
  {
    title: "Run Tracker",
    image: "/homepage.png",
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
  // {
  //   title: "Stock Analysis",
  //   image: "/parser.png",
  //   slug: "stock-analysis",
  //   technologies: [
  //     { icon: <SiReact />, color: "#61DAFB" },
  //     { icon: <SiJavascript />, color: "#F7DF1E" },
  //     { icon: <SiCsharp />, color: "#239120" },
  //   ],
  // },
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

export default function ClientSideProjects() {
  const router = useRouter();

  const handleProjectClick = (slug) => {
    router.push(`/project/${slug}`);
  };

  return (
    <>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={`${styles.card} ${styles.cardProject}`}
            onClick={() => handleProjectClick(project.slug)} 
          >
            <div className={styles.imageContainer}>
              <Image src={project.image} alt={project.title} fill />
            </div>
            <h3>{project.title}</h3>
            <div className={styles.technologies}>
              {project.technologies.map((tech, idx) => (
                <span key={idx} style={{ color: tech.color }}>
                  {tech.icon}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ThreeDModel />
    </>
  );
}
