import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ArticleCard = ({ article }) => {
  return (
    <Box p={4} bg="gray.100" borderRadius="md" mb={2}>
      <Heading size="sm">{article.title}</Heading>
      <Text>{article.snippet}</Text>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </Box>
  );
};

export default ArticleCard;
