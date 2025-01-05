import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Divider } from '@chakra-ui/react';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import useImproveBlogContent from '../hooks/useImproveBlogContent';

const ImproveBlogContent = () => {
  const [blogUrl, setBlogUrl] = useState('');
  const { improvedContent, isLoading, error, improveContent } = useImproveBlogContent();

  const handleImproveContent = async () => {
    try {
      await improveContent(blogUrl);
    } catch (err) {
      // エラーはすでにフックで処理されているため、ここでは何もしなくてもOK
      console.error('Error improving blog content:', err);
    }
  };

  return (
    <Box mt={8} p={4} bg="gray.50" borderRadius="md" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Heading size="md" color="teal.600">
          Improve Blog Content
        </Heading>
        <Divider />
        <CustomInput
          placeholder="Enter the blog article URL"
          value={blogUrl}
          onChange={(e) => setBlogUrl(e.target.value)}
        />
        <CustomButton onClick={handleImproveContent} isLoading={isLoading}>
          {isLoading ? 'Improving...' : 'Improve Content'}
        </CustomButton>
        {error && <Text color="red.500">Error: {error}</Text>}
        {improvedContent && (
          <Box p={4} bg="white" borderRadius="md" shadow="sm">
            <Heading size="sm">Improved Content</Heading>
            <Text mt={2} whiteSpace="pre-wrap">
              {improvedContent}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ImproveBlogContent;
