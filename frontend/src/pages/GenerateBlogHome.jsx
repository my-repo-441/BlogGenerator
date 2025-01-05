import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import useFetchContent from '../hooks/useFetchContent';
import FetchContent from '../components/FetchContent/FetchContent';
import GenerateBlog from '../components/GenerateBlog/GenerateBlog';
import {
  Box,
  VStack,
  Heading,
  Spinner,
  Divider,
  Text,
} from '@chakra-ui/react';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import ArticleCard from '../components/common/ArticleCard';

const GenerateBlogHome = () => {
  const { searchKeyword, setSearchKeyword } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState([]);
  const { contents, loading: fetchLoading, error: fetchError, fetchArticles } = useFetchContent(articles);

  const handleFetchArticles = async () => {
    try {
      const fetchedArticles = await fetchArticles(searchKeyword, count);
      setArticles(fetchedArticles);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Heading size="lg" color="teal.600">
          Article Fetcher
        </Heading>
        <Divider />
        <Box>
          <CustomInput
            placeholder="取得する記事のキーワードを入力してください。"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <CustomInput
            placeholder="取得する記事の数を入力してください。(空の場合は3つ)"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <CustomButton mt={2} onClick={handleFetchArticles} isLoading={fetchLoading}>
            {fetchLoading ? 'Fetching...' : 'Fetch Articles'}
          </CustomButton>
        </Box>
        {fetchError && <Text color="red.500">Error: {fetchError}</Text>}
        {fetchLoading && <Spinner />}
        <Box>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
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

export default GenerateBlogHome;
