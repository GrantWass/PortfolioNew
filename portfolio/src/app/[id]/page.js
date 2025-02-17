import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import styles from "./professional.module.css";
import professionalData from "./professionalData";
import Image from "next/image";

// Define generateMetadata to replace next/head
export async function generateMetadata({ params }) {
  const { id } = params;
  const experience = professionalData[id];

  if (!experience) {
    return {
      title: "Experience not found | Grant Wasserman",
    };
  }

  return {
    title: `${experience.title} at ${experience.company} | Grant Wasserman`,
    description: `Professional experience as a ${experience.title} at ${experience.company}`,
    keywords: `Software Developer, Full Stack, React, C#, Unity, Developer, Grant Wasserman, Web Development, ${experience.company}`,
    author: "Grant Wasserman",
    openGraph: {
      title: experience.title,
      description: `Professional experience at ${experience.company}`,
      url: `https://grantwasserman.com/professional/${id}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(professionalData).map((id) => ({ id }));
}

export default function ProfessionalPage({ params }) {
  const { id } = params;
  const experience = professionalData[id];

  if (!experience) {
    return <div className={styles.notFound}>Experience not found.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerImage}>
          <Image
            src={experience.image}
            alt={`Header image for ${experience.title} at ${experience.company}`}
            fill
            priority
          />
        </div>
        <Link href="/" className={styles.backArrow}>
          <FiArrowLeft size={36} />
        </Link>
        <h1 className={styles.title}>
          {experience.title} at {experience.company}
        </h1>
        <p className={styles.duration}>{experience.duration}</p>
        <p className={styles.location}>{experience.location}</p>

        <div className={styles.section}>
          {!experience.tasks.length ? null : (
            <>
              <h2 className={styles.sectionTitle}>Responsibilities</h2>
              <ul className={styles.bulletList}>
                {experience.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
