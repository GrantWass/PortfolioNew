import Header from "./Header/Header";
import styles from "./home.module.css";
import ClientSideProjects from "./Projects";
import { FaReact, FaUnity } from "react-icons/fa";
import { SiJavascript, SiDotnet, SiCsharp } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import Work from "./Work";
import Education from "./Education/Education";

export const metadata = {
  title: "Grant's Portfolio",
  description: "Grant's portfolio showcasing work experiences and projects",
  openGraph: {
    title: "Grant's Portfolio",
    description:
      "Explore the projects and professional experiences of Grant Wasserman.",
    url: "https://grantwasserman.com",
    // images: [
    //   {
    //     url: "https://grantwasserman.com/path/to/your/image.jpg", // Update this to the actual image URL you want to display
    //     width: 800,
    //     height: 600,
    //     alt: "Grant Wasserman's Portfolio",
    //   },
    // ],
    type: "website",
  },
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Professional Experience</h2>
          <Work />
        </section>

        <section className={styles.section}>
          <h2>Education</h2>
          <Education />
        </section>

        <section className={styles.section}>
          <h2>Projects</h2>
          <ClientSideProjects />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Grant. All rights reserved. 3D
          model: Desk by dook [CC-BY] via Poly Pizza.
        </p>
      </footer>
    </div>
  );
}
