import React, {useContext, useState, useEffect} from 'react';
import { AppContext } from '../context/AppContext';
import useFetchContent from '../hooks/useFetchContent';
import FetchContent from '../pages/FetchContent'; // パスを確認
import GenerateBlog from '../pages/GenerateBlog'; // パスを確認
import styles from './Home.module.css';

const Home = () => {
  const { searchKeyword, setSearchKeyword } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const { contents, loading: fetchLoading, error: fetchError } = useFetchContent(articles);

  const fetchArticles = async () => {
    if (!searchKeyword) {
      alert("Please enter a keyword!");
      return;
    }
    setArticles([]);

    try {
      const response = await fetch(`/api/fetch_bing_articles?keyword=${encodeURIComponent(searchKeyword)}`);
      if (!response.ok) {
        throw new Error(`Error fetching articles: ${response.statusText}`);
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("Articles fetched:", articles);
  }, [articles]);

  return (
    <div className={styles.container}>
      <h1>Article Fetcher</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter a keyword..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className={styles.input}
        />
        <button onClick={fetchArticles} className={styles.button}>
          {fetchLoading ? "Fetching..." : "Fetch Articles"}
        </button>
      </div>
      {fetchLoading && <p>Loading articles...</p>}
      {fetchError && <p className={styles.error}>Error: {fetchError}</p>}
      <div className={styles.articles}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className={styles.article}>
              <h3>{article.title}</h3>
              <p>{article.snippet}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          !fetchLoading && <p>No articles found.</p>
        )}
      </div>
      <FetchContent articles={articles} />
      <GenerateBlog contents={contents} />
    </div>
  );
};

export default Home;
