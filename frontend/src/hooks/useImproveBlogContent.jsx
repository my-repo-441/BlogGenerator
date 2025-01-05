import { useState } from 'react';

const useImproveBlogContent = () => {
  const [improvedContent, setImprovedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const improveContent = async (url) => {
    if (!url.trim()) {
      throw new Error('Please enter a valid blog URL.');
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/improve_blog_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setImprovedContent(data.improved_content);
    } catch (err) {
      setError(err.message);
      throw err; // コンポーネントでエラーハンドリング可能
    } finally {
      setIsLoading(false);
    }
  };

  return {
    improvedContent,
    isLoading,
    error,
    improveContent,
  };
};

export default useImproveBlogContent;
