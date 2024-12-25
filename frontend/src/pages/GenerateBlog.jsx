import React, { useState, useContext } from 'react';
import { Box, VStack, Heading, Input, Button, Text, Divider } from '@chakra-ui/react';
import useGenerateBlog from '../hooks/useGenerateBlog';
import { AppContext } from '../context/AppContext';

const GenerateBlog = ({ contents }) => {
  const { blogKeywords, setBlogKeywords } = useContext(AppContext);
  const { blog, statusLog, loading, error, generateBlog } = useGenerateBlog(contents);
  const [blogTitle, setBlogTitle] = useState('');

  const handleGenerate = () => {
    generateBlog(blogTitle, blogKeywords);
  };

  return (
    <Box mt={8} p={4} bg="gray.50" borderRadius="md" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Heading size="md" color="teal.600">
          Generate Blog
        </Heading>
        <Divider />
        <Box>
          <Input
            placeholder="Enter the blog title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            size="md"
          />
        </Box>
        <Box>
          <Input
            placeholder="Enter keywords (comma-separated)"
            value={blogKeywords}
            onChange={(e) => setBlogKeywords(e.target.value)}
            size="md"
          />
        </Box>
        <Button
          colorScheme="teal"
          onClick={handleGenerate}
          isLoading={loading}
        >
          Generate Blog
        </Button>
        {error && <Text color="red.500">Error: {error}</Text>}
        {blog && (
          <Box p={4} bg="white" borderRadius="md" shadow="sm">
            <Heading size="sm">Generated Blog</Heading>
            {/* 改行を保持するために whiteSpace を指定 */}
            <Text mt={2} whiteSpace="pre-wrap">
              {blog}
            </Text>
          </Box>
        )}
        {statusLog.length > 0 && (
          <Box>
            <Heading size="sm" mb={2}>
              Status Log
            </Heading>
            <VStack spacing={2} align="stretch">
              {statusLog.map((log, index) => (
                <Text key={index}>{log}</Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default GenerateBlog;
