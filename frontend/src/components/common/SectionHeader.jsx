import React from 'react';
import { Heading, Divider, VStack } from '@chakra-ui/react';

const SectionHeader = ({ title }) => (
  <VStack spacing={2} align="stretch">
    <Heading size="md" color="teal.600">
      {title}
    </Heading>
    <Divider />
  </VStack>
);

export default SectionHeader;
