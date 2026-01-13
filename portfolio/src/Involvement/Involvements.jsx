"use client";
import { useState } from "react";
import styles from "./involvement.module.css";
import Image from "next/image";

const involvements = [
  {
    title: "Student Athlete",
    type: "Athletics & Teamwork",
    description:
      "Competed year-round in indoor/outdoor track and cross country, balancing academics with athletic performance, responsibilities as a captain, and contributing to team success.",
    image: "/xc.JPG"
  },
  {
    title: "Club Involvement",
    type: "SAAC, Lead-N, Math Club",
    description:
    "Actively contributed to student organizations by leading initiatives, mentoring younger peers, and fostering collaboration. From mentoring younger students, to engaging in leadership development through SAAC and Lead-N, these experiences strengthened my teamwork, communication, and problem-solving skills beyond the classroom.",
    image: "/unlc.jpg"
  },
  {
    title: "Community Engagement",
    type: "Volunteerism & Civic Participation",
    description:
      "Participated in various community service events over the past year, focusing on initiatives that leveverage our platform as an athlete to improve communities. Examples include Run Your City, Food Bank of Lincoln, and Link N Leaders.",
    image: "/inv3.png"
  },
];

export default function Involvements() {
  const [flipped, setFlipped] = useState(
    Array(involvements.length).fill(false)
  );

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className={styles.container}>
      {involvements.map((item, index) => (
        <div
          key={index}
          className={`${styles.item} ${flipped[index] ? styles.flipped : ""}`}
          onClick={() => handleFlip(index)}
        >
          <div className={styles["flip-card-inner"]}>
            <div className={styles["flip-card-front"]}>
              <Image
                className={styles.image}
                src={item.image}
                height={300}
                width={300}
                alt={item.title}
              />
              <h3>{item.title}</h3>
              <h4>{item.type}</h4>
            </div>

            <div className={styles["flip-card-back"]}>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
