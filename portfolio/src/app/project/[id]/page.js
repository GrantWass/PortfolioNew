import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import styles from "./project.module.css";
import projectData from "./projectData";
import Lightbox from "./Lightbox";

// Define generateMetadata to replace next/head
export async function generateMetadata({ params }) {
  const { id } = params;
  const project = projectData[id];

  if (!project) {
    return {
      title: "Project not found | Grant Wasserman",
    };
  }

  return {
    title: `${project.title} | Grant Wasserman`,
    description: project.summary,
    keywords: `Web Development, React, Developer, JavaScript, C#, .NET, Full Stack, Project Management, Software Engineering, Grant Wasserman, ${project.title}`,
    author: "Grant Wasserman",
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://grantwasserman.com/project/${id}`,
      type: "website",
      images: [
        {
          url: project.images[0],
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(projectData).map((id) => ({ id }));
}

export default function ProjectPage({ params }) {
  const { id } = params;
  const project = projectData[id];

  if (!project) {
    return <div className={styles.notFound}>Project not found.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <Link href="/" className={styles.backArrow}>
          <FiArrowLeft size={36} />
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
        <Lightbox images={project.images} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Project Background</h2>
          <p className={styles.learnedParagraph}>{project.whatILearned}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What I Did</h2>
          <ul className={styles.bulletList}>
            {project.whatIDid.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {project.url && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Project URL</h2>
            <a
              href={project.url}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
