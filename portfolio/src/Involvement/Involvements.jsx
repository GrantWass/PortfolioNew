"use client";
import { useState } from "react";
import styles from "./involvement.module.css";
import Image from "next/image";

const involvements = [
  {
    title: "Student Athlete",
    type: "Athletics & Teamwork",
    description:
      "Competed year-round in indoor/outdoor track and Cross Country, balancing academics with athletic performance and contributing to team success.",
    image: "/xc.JPG"
  },
  {
    title: "Initialize",
    type: "Computer Science Education & Mentorship",
    description:
      "Volunteered to teach coding to young students, and engaged in discussions with peers to explore new ideas in technology and innovation.",
    image: "/init.png"
  },
  {
    title: "Community Engagement",
    type: "Volunteerism & Civic Participation",
    description:
      "Participated in six community service events over the past year, focusing on initiatives that improve local communities and foster civic responsibility.",
    image: "/temp.jpg"
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
