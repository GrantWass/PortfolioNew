"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import styles from './Timeline.module.css';
import Image from 'next/image'

const experiences = [
    {
      title: "Software Developer",
      company: "Speedway Motors",
      type: "Internship",
      dates: "May 2024 - May 2025",
      image: "/speedwayicon.png",
      link: "/speedway",
      start: 10,
      end: 60,
      position: 'above',
      color: "purple"
    },
    {
      title: "Software Engineer",
      company: `Kiewit`,
      type: "Design Studio",
      dates: "August 2024 - May 2025",
      image: "/kiewiticon.png",
      link: "/kiewit",
      start: 25,
      end: 60,
      position: 'below',
      color: "#FFCD23"
    },
    {
      title: "Software Developer",
      company: "Garmin",
      type: "Internship",
      dates: "May 2025 - August 2025",
      image: "/garminicon.png",
      link: "/garmin",
      start: 60,
      end: 90,
      position: 'above',
      color: "#6DCFF6"
    },
  ];

const Timeline = () => {

  return (
    <div className={styles.timeline}>
      {experiences.map(event => {
        const width = event.end - event.start; 

        return (
        <div key={event.company} className={styles.eventContainer}>
            <div 
                className={styles.eventLine} 
                style={{ 
                    width: `${width}%`, 
                    left: `${event.start}%`, 
                    top: event.position === 'above' ? "-5px" : "7px",
                    borderRadius: event.position === 'above' ? "10px 10px 0 0" : "0 0 10px 10px",
                    backgroundColor: event.color,
                }} 
                >
                <Event event={event}/>
            </div>
        </div>
        );
      })}
        <div className={styles.arrowLeft}></div>
        <div className={styles.arrowRight}></div>
    </div>
  );
};

const Event = ({event}) => {
    const router = useRouter();

    const handleClick = (link) => {
        router.push(link);
    };

    return (
        <div className={`${styles.event} ${event.position === 'above' ? styles.cardAbove : styles.cardBelow}`}>
            <Image
                src={event.image}
                height={100}
                width={100}
                className={styles.image}
                onClick={() => handleClick(event.link)}
                alt={event.company}
            />
            <div className={styles.eventDescription}>
                <h2>{event.company}</h2>
                <p className={styles.role}>{event.title}</p>
                <h3>{event.type}</h3>
                <h4>{event.dates}</h4>
            </div>
        </div>
    )
}

export default Timeline;
