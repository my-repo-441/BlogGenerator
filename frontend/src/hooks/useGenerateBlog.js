import React, { useState, useEffect } from 'react';

export const useGenerateBlog = (contents) => {
    const [blog, setBlog] = useState("");
    const [statusLog, setStatusLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const generateBlog = async (title, blogKeywords) => {
      if (!contents || contents.length === 0) {
        alert("No content available to generate a blog.");
        return;
      }
      setLoading(true);
      setError("");
      setBlog("");
      setStatusLog([]);
  
      try {
        const validContents = contents.filter((c) => c.status === "success");
        const response = await fetch("/api/run_pipeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            blogKeywords: blogKeywords.split(",").map((kw) => kw.trim()),
            urls: validContents.map((c) => ({ url: c.url, content: c.content })),
          }),
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setBlog(data.generated_blog || "No blog content generated.");
        setStatusLog(data.status_log || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { blog, statusLog, loading, error, generateBlog };
  };
  
  export default useGenerateBlog;