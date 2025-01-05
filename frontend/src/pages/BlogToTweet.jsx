import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Divider } from '@chakra-ui/react';
import useFetchMyContent from '../hooks/useFetchMyContent';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';

const BlogToTweet = () => {
  const [blogUrl, setBlogUrl] = useState(''); // 入力されたブログURL
  const { twitterPost, loading, error, fetchTwitterContent } = useFetchMyContent(); // カスタムフックを利用

  const handleGenerateTweet = async () => {
    if (!blogUrl.trim()) {
      alert('Please enter a valid blog URL.');
      return;
    }
    try {
      await fetchTwitterContent(blogUrl); // カスタムフックでAPI呼び出し
    } catch (err) {
      console.error('Error generating Twitter post:', err);
    }
  };

  return (
    <Box mt={8} p={4} bg="gray.50" borderRadius="md" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Heading size="md" color="teal.600">
          Generate Twitter Post from Blog
        </Heading>
        <Divider />
        <CustomInput
          placeholder="Enter your blog article URL"
          value={blogUrl}
          onChange={(e) => setBlogUrl(e.target.value)}
        />
        <CustomButton onClick={handleGenerateTweet} isLoading={loading}>
          {loading ? 'Generating...' : 'Generate Twitter Post'}
        </CustomButton>
        {error && <Text color="red.500">Error: {error}</Text>}
        {twitterPost && (
          <Box p={4} bg="white" borderRadius="md" shadow="sm">
            <Heading size="sm">Generated Twitter Post</Heading>
            <Text mt={2} whiteSpace="pre-wrap">
              {twitterPost}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default BlogToTweet;
