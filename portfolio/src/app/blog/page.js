import Link from 'next/link';
import styles from './blog.module.css';

const blogPosts = [
  {
    id: 'senior-year-reflection',
    title: 'Senior Year Reflection',
    excerpt: 'Looking back on my final year of college and the lessons learned along the way.',
    date: 'January 10, 2026',
    readTime: '5 min read',
  },
  // Add more blog posts here in the future
];

export const metadata = {
  title: "Blog - Grant's Portfolio",
  description: "Read Grant's thoughts and reflections on software development, college life, and career growth.",
};

export default function BlogPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Thoughts, reflections, and insights from my journey
        </p>
      </div>

      <div className={styles.blogGrid}>
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className={styles.blogCard}
          >
            <div className={styles.cardContent}>
              <h2 className={styles.blogTitle}>{post.title}</h2>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
              <div className={styles.blogMeta}>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
