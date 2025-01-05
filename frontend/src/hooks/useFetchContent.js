import React, { useState, useEffect } from 'react';

export const useFetchContent = (articles) => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const BASE_URL = import.meta.env.MODE === "development" ? "/api" : "http://127.0.0.1:5000/api";

    useEffect(() => {
      const fetchContents = async () => {
        if (!articles || articles.length === 0) return;
        setLoading(true);
        setError("");
        setContents([]);
  
        try {
          const response = await fetch(`${BASE_URL}/scrape_content`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ urls: articles.map((a) => a.url) }),
          });
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);
          const data = await response.json();
          setContents(data.results || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchContents();
    }, [articles]);

    const fetchArticles = async (searchKeyword, count) => {
        if (!searchKeyword) {
          throw new Error('Please enter a keyword!');
        }

        if (!count || isNaN(count) || parseInt(count) <= 0) {
          throw new Error('Please enter a valid number for count.');
        }

        setLoading(true);
        setError("");

        try {
          const response = await fetch(`${BASE_URL}/fetch_bing_articles?keyword=${encodeURIComponent(searchKeyword)}&count=${count}`);
          if (!response.ok) {
            throw new Error(`Error fetching articles: ${response.statusText}`);
          }
          const data = await response.json();
          return data;
        } catch (err) {
          setError(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
      };
  
    return { contents, loading, error, fetchArticles };
  };

export default useFetchContent;
