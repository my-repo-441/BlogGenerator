import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FetchContent from "./FetchContent";
import styles from "./Home.module.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchArticles = async () => {
    if (!keyword) {
      alert("Please enter a keyword!");
      return;
    }
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const response = await fetch(`/api/fetch_bing_articles?keyword=${encodeURIComponent(keyword)}`);
      if (!response.ok) {
        throw new Error(`Error fetching articles: ${response.statusText}`);
      }

      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <div className={styles.container}>
      <h1>Article Fetcher</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter a keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.input}
        />
        <button onClick={fetchArticles} className={styles.button}>
          Fetch Articles
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      <div className={styles.articles}>
        {articles.map((article, index) => (
          <div key={index} className={styles.article}>
            <h3>{article.title}</h3>
            <p>{article.snippet}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
      {/* <div className={styles.linkContainer}>
        <Link to="/fetch-content" className={styles.link}>
          Go to Fetch Content
        </Link>
      </div> */}
      <FetchContent articles={articles} />
    </div>
  );
};

export default Home;
