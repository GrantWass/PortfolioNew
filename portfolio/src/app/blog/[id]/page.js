import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './blog.module.css';
import { blogData } from './blogData';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  return Object.keys(blogData).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }) {
  const blog = blogData[params.id];
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} - Grant's Blog`,
    description: blog.content.substring(0, 160),
  };
}

export default function BlogPost({ params }) {
  const blog = blogData[params.id];

  if (!blog) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
      </div>

      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <h1 className={styles.title}>{blog.title}</h1>
          <div className={styles.meta}>
            <time className={styles.date}>{blog.date}</time>
            <span className={styles.separator}>•</span>
            <span className={styles.readTime}>{blog.readTime}</span>
          </div>
        </div>

        <div className={styles.content}>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </article>

      <div className={styles.footer}>
        <Link href="/blog" className={styles.backButton}>
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
