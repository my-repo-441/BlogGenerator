import React from 'react';
import useFetchContent from '../hooks/useFetchContent';

const FetchContent = ({ articles }) => {
  const { contents, loading, error } = useFetchContent(articles);

  return (
    <div>
      {loading && <p>Loading content...</p>}
      {error && <p>Error: {error}</p>}
      {contents && contents.length > 0 ? (
        contents.map((content, index) => (
          <div key={index}>
            <h3>Content for URL: {content.url}</h3>
            <p>{content.content}</p> {/* content にアクセス */}
          </div>
        ))
      ) : (
        !loading && <p>No content available.</p>
      )}
    </div>
  );
};

export default FetchContent;
