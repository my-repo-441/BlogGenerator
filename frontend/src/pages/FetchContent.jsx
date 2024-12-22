import React, { useState, useEffect } from 'react';
import GenerateBlog from './GenerateBlog';
import styles from './FetchContent.module.css';

const FetchContent = ({ articles }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContents = async () => {
    if (!articles || articles.length === 0) {
      return;
    }

    setLoading(true);
    setError('');
    setContents([]);

    try {
      const response = await fetch('/api/scrape_content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: articles.map((article) => article.url) }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching contents: ${response.statusText}`);
      }

      const data = await response.json();
      setContents(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articles && articles.length > 0) {
      fetchContents();
    }
  }, [articles]);

  return (
    <div className={styles.container}>
      <h1>Fetch Content</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      <div className={styles.contents}>
        {contents.map((content, index) => (
          <div key={index} className={styles.contentItem}>
            <h3>Content for URL: {content.url}</h3>
            {content.status === 'success' && <div>{content.content}</div>}
            {content.status === 'disallowedByRobotsTxt' && <p>Disallowed by robots.txt</p>}
            {content.status === 'fetchError' && <p>Error fetching content: {content.error}</p>}
            {content.status === 'unknownError' && <p>Unknown error: {content.error}</p>}
          </div>
        ))}
      </div>
      <GenerateBlog contents={contents} />
    </div>
  );
};

export default FetchContent;
