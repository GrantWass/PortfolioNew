import Header from "../Header/Header";
import styles from "./home.module.css";
import Education from "../Education/Education";
import Timeline from "../Timeline/Timeline";
import Model from "../Model/DeskModel";
import Involvements from "@/Involvement/Involvements";
import SkillMap from "@/Skills/Skills";
import { GiClick } from "react-icons/gi";
import Projects from "../Projects/ProjectSlider";

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
        <section
          className={styles.section}
          style={{ marginBottom: "-20px", marginTop: "-50px" }}
        >
          <h2 style={{ marginBottom: "50px" }}>Projects</h2>
          <Projects />
        </section>

        <section className={styles.section}>
          <h2>
            Professional Experience <GiClick size={30} />
          </h2>
          <Timeline />
        </section>

        <section className={styles.section}>
          <h2>
            Involvement <GiClick size={30} />
          </h2>
          <Involvements />
        </section>

        <section
          className={`${styles.section} ${styles.hideOnMobile}`} //Todo
          style={{ marginBottom: "-20px" }}
        >
          <h2>
            A Look Into My Life <GiClick size={30} />
          </h2>
          <Model />
        </section>

        <section className={styles.section}>
          <h2>Education</h2>
          <Education />
        </section>

        <section className={styles.section}>
          <h2>
            My Skills <GiClick size={30} />
          </h2>
          <SkillMap />
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
