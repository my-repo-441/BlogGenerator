import React, { useState, useEffect } from 'react';

export const useFetchContent = (articles) => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchContents = async () => {
        if (!articles || articles.length === 0) return;
        setLoading(true);
        setError("");
        setContents([]);
  
        try {
          const response = await fetch("/api/scrape_content", {
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
  
    return { contents, loading, error };
  };
  
  export default useFetchContent;