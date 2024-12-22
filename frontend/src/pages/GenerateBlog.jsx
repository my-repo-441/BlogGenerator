import React, { useState } from 'react';
import styles from './GenerateBlog.module.css';

const GenerateBlog = ({ contents }) => {
  const [blog, setBlog] = useState('');
  const [statusLog, setStatusLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(contents);

  const generateBlog = async () => {
    if (!contents || contents.length === 0) {
      alert('No content available to generate a blog.');
      return;
    }

    setLoading(true);
    setError('');
    setBlog('');
    setStatusLog([]);

    try {
      const validContents = contents.filter((content) => content.status === 'success');

      const response = await fetch('/api/run_pipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: 'Generated Blog',
          urls: validContents.map((content) => ({
            url: content.url,
            content: content.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error generating blog: ${response.statusText}`);
      }

      const data = await response.json();
      setBlog(data.generated_blog || 'No blog content generated.');
      setStatusLog(data.status_log || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Generate Blog</h1>
      <button onClick={generateBlog} className={styles.button} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Blog'}
      </button>
      {error && <p className={styles.error}>Error: {error}</p>}
      {blog && <div className={styles.blog}>{blog}</div>}
      {statusLog.length > 0 && (
        <div className={styles.statusLog}>
          <h2>Status Log</h2>
          <ul>
            {statusLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenerateBlog;
