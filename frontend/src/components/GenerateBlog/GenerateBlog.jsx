import React, { useState, useContext } from 'react';
import { Box, VStack, Heading, Text, Divider } from '@chakra-ui/react';
import BlogPreviewModal from '../../pages/BlogPreviewModal';
import useGenerateBlog from '../../hooks/useGenerateBlog';
import CustomButton from '../common/CustomButton';
import StatusLog from '../common/StatusLog';
import CustomInput from '../common/CustomInput';
import { AppContext } from '../../context/AppContext';

const GenerateBlog = ({ contents }) => {
  const { blogKeywords: globalKeywords, setBlogKeywords: setGlobalKeywords } = useContext(AppContext);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogKeywords, setBlogKeywords] = useState(globalKeywords || '');
  const [continuousIteration, setContinuousIteration] = useState('');
  const [improvementIteration, setImprovementIteration] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { blog, statusLog, loading, error, generateBlog } = useGenerateBlog(contents);

  const handleGenerate = async () => {
    if (!blogTitle.trim() || !blogKeywords.trim()) {
      alert('Please provide valid blog title and keywords.');
      return;
    }
    try {
      await generateBlog({
        title: blogTitle.trim(),
        keywords: blogKeywords.trim(),
        continuousIteration: continuousIteration.trim() || 0,
        improvementIteration: improvementIteration.trim() || 0,
      });
      setGlobalKeywords(blogKeywords.trim()); // Update global keywords
    } catch (err) {
      console.error('Error generating blog:', err);
    }
  };

  const handlePreviewOpen = () => setIsPreviewOpen(true);
  const handlePreviewClose = () => setIsPreviewOpen(false);

  return (
    <Box mt={8} p={4} bg="gray.50" borderRadius="md" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Heading size="md" color="teal.600">
          Generate Blog
        </Heading>
        <Divider />
        <CustomInput
          placeholder="Enter the blog title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <CustomInput
          placeholder="Enter keywords (comma-separated)"
          value={blogKeywords}
          onChange={(e) => setBlogKeywords(e.target.value)}
        />
        <CustomInput
          placeholder="Enter improvementIteration"
          type="number"
          value={improvementIteration}
          onChange={(e) => setImprovementIteration(e.target.value)}
        />
        <CustomInput
          placeholder="Enter continuousIteration"
          type="number"
          value={continuousIteration}
          onChange={(e) => setContinuousIteration(e.target.value)}
        />
        <CustomButton onClick={handleGenerate} isLoading={loading}>
          Generate Blog
        </CustomButton>
        {error && <Text color="red.500">Error: {error}</Text>}
        {blog && (
          <Box p={4} bg="white" borderRadius="md" shadow="sm">
            <Heading size="sm">Generated Blog</Heading>
            <Text mt={2} whiteSpace="pre-wrap">
              {blog}
            </Text>
            <CustomButton mt={4} colorScheme="blue" onClick={handlePreviewOpen}>
              Preview
            </CustomButton>
          </Box>
        )}
        {statusLog.length > 0 && <StatusLog logs={statusLog} />}
        <BlogPreviewModal
          isOpen={isPreviewOpen}
          onClose={handlePreviewClose}
          blogContent={blog}
        />
      </VStack>
    </Box>
  );
};

export default GenerateBlog;
