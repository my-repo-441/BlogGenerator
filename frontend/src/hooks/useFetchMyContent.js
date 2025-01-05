import { useState } from 'react';

const useFetchMyContent = () => {
  const [twitterPost, setTwitterPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const BASE_URL = import.meta.env.MODE === 'development' ? '/api' : 'http://127.0.0.1:5000/api';

  const fetchTwitterContent = async (url) => {
    if (!url) throw new Error('Please provide a valid URL.');

    setLoading(true);
    setError('');
    setTwitterPost('');
    try {
      const response = await fetch(`${BASE_URL}/generate_twitter_content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error(`Error generating Twitter content: ${response.statusText}`);
      }
      const data = await response.json();
      setTwitterPost(data.twitter_post);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { twitterPost, loading, error, fetchTwitterContent };
};

export default useFetchMyContent;
