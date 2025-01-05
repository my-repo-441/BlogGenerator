import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

const CardLink = ({ title, description, to }) => {
  return (
    <Box
      as={RouterLink}
      to={to}
      p={4}
      borderRadius="md"
      bg="gray.100"
      _hover={{ bg: 'gray.200' }}
      shadow="sm"
    >
      <Heading size="md" color="teal.600">
        {title}
      </Heading>
      <Text mt={2}>{description}</Text>
    </Box>
  );
};

export default CardLink;
