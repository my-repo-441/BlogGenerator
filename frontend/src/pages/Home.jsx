import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import useFetchContent from '../hooks/useFetchContent';
import FetchContent from './FetchContent';
import GenerateBlog from './GenerateBlog';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Spinner,
  Divider,
} from '@chakra-ui/react';

const Home = () => {
  const { searchKeyword, setSearchKeyword } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState([]);
  const { contents, loading: fetchLoading, error: fetchError } = useFetchContent(articles);

  const fetchArticles = async () => {
    if (!searchKeyword) {
      alert('Please enter a keyword!');
      return;
    }
    setArticles([]);

    // 数値チェック
    if (!count || isNaN(count) || parseInt(count) <= 0) {
      alert('Please enter a valid number for count.');
      return;
    }

    try {
      const response = await fetch(`/api/fetch_bing_articles?keyword=${encodeURIComponent(searchKeyword)}&count=${count}`);
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
    console.log('Articles fetched:', articles);
  }, [articles]);

  useEffect(() => {
    console.log('count:', count);
  }, [count]);

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Heading size="lg" color="teal.600">
          Article Fetcher
        </Heading>
        <Divider />
        <Box>
          <Input
            placeholder="取得する記事のキーワードを入力してください。"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            size="md"
          />
          <Input
            placeholder="取得する記事の数を入力してください。(空の場合は3つ)"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            size="md"
          />
          <Button
            mt={2}
            colorScheme="teal"
            onClick={fetchArticles}
            isLoading={fetchLoading}
          >
            {fetchLoading ? 'Fetching...' : 'Fetch Articles'}
          </Button>
        </Box>
        {fetchError && <Text color="red.500">Error: {fetchError}</Text>}
        {fetchLoading && <Spinner />}
        <Box>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <Box key={index} p={4} bg="gray.100" borderRadius="md" mb={2}>
                <Heading size="sm">{article.title}</Heading>
                <Text>{article.snippet}</Text>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </Box>
            ))
          ) : (
            !fetchLoading && <Text>No articles found.</Text>
          )}
        </Box>
        <FetchContent articles={articles} />
        <GenerateBlog contents={contents} />
      </VStack>
    </Box>
  );
};

export default Home;
