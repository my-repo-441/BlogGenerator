import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Divider, Button } from '@chakra-ui/react';
import CardLink from '../components/common/CardLink'; // CardLink が定義されているファイルからインポート

const Top = () => {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color="teal.600">
          Welcome to the Web App!
        </Heading>
        <Divider />
        <CardLink
          title="Generate Blog"
          description="Retrieve and display articles based on a keyword."
          to="/generate-blog"
        />
        <CardLink
          title="Blog to Tweet"
          description="Convert Blog into Twitter posts."
          to="/blog-to-tweet"
        />
      </VStack>
    </Box>
  );
};

export default Top;
