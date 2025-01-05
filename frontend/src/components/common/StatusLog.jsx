import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';

const StatusLog = ({ logs }) => {
  if (!logs || logs.length === 0) return null;

  return (
    <Box>
      <Heading size="sm" mb={2}>
        Status Log
      </Heading>
      <VStack spacing={2} align="stretch">
        {logs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
      </VStack>
    </Box>
  );
};

export default StatusLog;
