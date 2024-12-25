import React, { useState, useContext } from 'react';
import useGenerateBlog from '../hooks/useGenerateBlog';
import { AppContext } from '../context/AppContext';
import styles from './GenerateBlog.module.css';

const GenerateBlog = ({ contents }) => {
  const { searchKeyword, blogKeywords, setBlogKeywords } = useContext(AppContext);
  const { blog, statusLog, loading, error, generateBlog } = useGenerateBlog(contents);
  const [blogTitle, setBlogTitle] = useState(searchKeyword);

  const handleGenerate = () => {
    generateBlog(blogTitle, blogKeywords);
  };


  return (
    <div className={styles.container}>
      <h1>Generate Blog</h1>
      <div className={styles.inputGroup}>
        <label htmlFor="blogTitle" className={styles.label}>Blog Title:</label>
        <input
          id="blogTitle"
          type="text"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className={styles.input}
          placeholder="Enter the blog title"
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="blogKeywords" className={styles.label}>Blog Keywords:</label>
        <input
          id="blogKeywords"
          type="text"
          value={blogKeywords}
          onChange={(e) => setBlogKeywords(e.target.value)}
          className={styles.input}
          placeholder="Enter keywords (comma-separated)"
        />
      </div>
      <button onClick={handleGenerate} className={styles.button} disabled={loading}>
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

