import React, { useState, useContext } from 'react';
import { Box, VStack, Heading, Input, Button, Text, Divider } from '@chakra-ui/react';
import useGenerateBlog from '../hooks/useGenerateBlog';
import { AppContext } from '../context/AppContext';
import BlogPreviewModal from './BlogPreviewModal';

const GenerateBlog = ({ contents }) => {
  const { blogKeywords, setBlogKeywords } = useContext(AppContext);
  const { blog, statusLog, loading, error, generateBlog } = useGenerateBlog(contents);
  const [blogTitle, setBlogTitle] = useState('');
  const [continuousIteration, setContinuousIteration] = useState('');
  const [improvementIteration, setImprovementIteration] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // モーダルの状態管理

  const handleGenerate = () => {
    generateBlog(blogTitle, blogKeywords, continuousIteration, improvementIteration);
  };

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
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
        <Box>
          <Input
            placeholder="Enter improvementIteration"
            type="number"
            value={improvementIteration}
            onChange={(e) => setImprovementIteration(e.target.value)}
            size="md"
          />
        </Box>
        <Box>
          <Input
            placeholder="Enter continuousIteration"
            type="number"
            value={continuousIteration}
            onChange={(e) => setContinuousIteration(e.target.value)}
            size="md"
          />
        </Box>
        <Button colorScheme="teal" onClick={handleGenerate} isLoading={loading}>
          Generate Blog
        </Button>
        {error && <Text color="red.500">Error: {error}</Text>}
        {blog && (
          <Box>
            <Box p={4} bg="white" borderRadius="md" shadow="sm">
              <Heading size="sm">Generated Blog</Heading>
              <Text mt={2} whiteSpace="pre-wrap">
                {blog}
              </Text>
            </Box>
            <Button mt={4} colorScheme="blue" onClick={handlePreviewOpen}>
              Preview
            </Button>
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

      {/* プレビューモーダル */}
      <BlogPreviewModal isOpen={isPreviewOpen} onClose={handlePreviewClose} blogContent={blog} />
    </Box>
  );
};

export default GenerateBlog;
