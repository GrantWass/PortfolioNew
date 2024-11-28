import styles from "./education.module.css";
import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { FaCalculator, FaCode, FaDatabase, FaBriefcase } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";


const Education = () => {
  const educationData = {
    school: "Raikes School of Computer Science at the University of Nebraska",
    undergraduate: {
      degree: "Bachelor of Science",
      majors: [
        { name: "Mathematics", icon: <FaCalculator /> },
        { name: "Computer Science", icon: <FaCode /> },
        { name: "Data Science", icon: <FaDatabase /> },
      ],
      minor: { name: "Business", icon: <FaBriefcase /> },
      graduation: "Graduation May 2026",
    },
    masters: {
      degree: "Master of Science in Computer Science",
      major: { name: "Emphasis in AI and Machine Learning", icon: <LuBrainCircuit /> },
      graduation: "Graduation May 2027",
    },
    gpa: "GPA: 3.97/4.00",
    headerImage: "/unl_header.png",
    image: "/unl.png",
  };

  return (
    <div className={styles.educationSection}>
      <div className={styles.headerImageContainer}>
        <Image
          src={educationData.headerImage}
          alt="University Banner"
          fill
          className={styles.headerImage}
        />
      </div>

      <Image
        src={educationData.image}
        alt="University Logo"
        width={80}
        height={80}
        className={styles.schoolLogo}
      />

      <h3 className={styles.schoolName}>{educationData.school}</h3>

      <div className={styles.gpaContainer}>
        <p>{educationData.gpa}</p>
      </div>

      <div className={styles.educationDetails}>
        <div className={styles.educationBlock}>
            <h4>Undergraduate</h4>
            <h5>{educationData.undergraduate.degree}</h5>
            <div className={styles.majorContainer}>
            {educationData.undergraduate.majors.map((major, index) => (
              <div key={index} className={styles.majorItem}>
                {major.icon} <p>{major.name}</p>
              </div>
            ))}
            </div>
            <div className={styles.graduationItem}>
              <FaGraduationCap /> <p>{educationData.undergraduate.graduation}</p>
            </div>
        </div>

        <div className={styles.educationBlock}>
            <h4>Graduate</h4>
            <h5>{educationData.masters.degree}</h5>
            <div className={styles.majorContainer}>
            <div className={styles.majorItem}>
              {educationData.masters.major.icon} <p>{educationData.masters.major.name}</p>
            </div>
            </div>
            <div className={styles.graduationItem}>
              <GiGraduateCap /> <p>{educationData.masters.graduation}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
