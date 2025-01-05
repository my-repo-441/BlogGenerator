import { useState } from 'react';

/**
 * Custom hook to handle blog generation process.
 * @param {Array} contents - List of content data to be used in blog generation.
 * @returns {Object} - Hook state and actions for blog generation.
 */
const useGenerateBlog = (contents) => {
  const [blog, setBlog] = useState(''); // Generated blog content
  const [statusLog, setStatusLog] = useState([]); // Logs of the generation process
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message if any

  /**
   * Generates a blog based on the provided title, keywords, and contents.
   * @param {Object} params - The parameters for blog generation.
   * @param {string} params.title - Title of the blog.
   * @param {string} params.keywords - Keywords for the blog, comma-separated.
   * @param {number} params.continuousIteration - Number of continuous iterations.
   * @param {number} params.improvementIteration - Number of improvement iterations.
   */
  const generateBlog = async ({ title, keywords, continuousIteration, improvementIteration }) => {
    if (!contents || contents.length === 0) {
      throw new Error('No content available to generate a blog.');
    }

    setLoading(true);
    setError(null);
    setBlog('');
    setStatusLog([]);

    try {
      const validContents = contents.filter((c) => c.status === 'success'); // Filter valid content entries

      const response = await fetch('/api/run_pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          blogKeywords: keywords.split(',').map((kw) => kw.trim()), // Split and trim keywords
          urls: validContents.map((c) => ({ url: c.url, content: c.content })), // Prepare content URLs
          continuousIteration: parseInt(continuousIteration, 10),
          improvementIteration: parseInt(improvementIteration, 10),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setBlog(data.generated_blog || 'No blog content generated.');
      setStatusLog(data.status_log || []);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return {
    blog,
    statusLog,
    loading,
    error,
    generateBlog,
  };
};

export default useGenerateBlog;
