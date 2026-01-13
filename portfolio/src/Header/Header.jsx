import styles from './header.module.css'; 
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaStrava, FaFileAlt, FaGithub } from 'react-icons/fa'; 
import Headshot from '/public/Headshot.webp';
import WordTransition from './WordTransition'; 

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          Hi, I am <strong className={styles.highlight}>Grant Wasserman</strong>
        </div>
        <div className={styles.subtitle}>
          I am a <WordTransition /> 
        </div>
      </div>
      <div className={styles.imgContactContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={Headshot}
            alt="Grant's Headshot"
            width={300}
            height={300}
            className={styles.headshot}
            priority
            fetchPriority='high'
          />
        </div>
        <div className={styles.contactText}>
          <span>
            <a href="mailto:grantmwasserman@gmail.com" className={styles.contactLink}>
              grantmwasserman@gmail.com
            </a>
          </span>
          <span>
            <a href="tel:4025607989" className={styles.contactLink}>
              402-560-7989
            </a>
          </span>
          <span>
            <Link href="/blog" className={styles.contactLink}>
              Link to Blog
            </Link>
          </span>
        </div>
        <div className={styles.iconsContainer}>
          <a href="https://github.com/GrantWass" target="_blank" rel="noopener noreferrer">
            <FaGithub className={`${styles.icon} ${styles.iconGithub}`} />
          </a>
          <a href="https://www.linkedin.com/in/grant-wass/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={`${styles.icon} ${styles.iconLinkedin}`} />
          </a>
          <a href="https://www.instagram.com/gran_t12/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className={`${styles.icon} ${styles.iconInstagram}`} />
          </a>
          <a href="https://www.strava.com/athletes/39084065" target="_blank" rel="noopener noreferrer">
            <FaStrava className={`${styles.icon} ${styles.iconStrava}`} />
          </a>
          <a href="/Resume_2025.pdf" target="_blank" rel="noopener noreferrer">
            <FaFileAlt className={`${styles.icon} ${styles.iconResume}`} />
          </a>
        </div>
      </div>
    </header>
  );
}
