import React from 'react';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ children, colorScheme = 'teal', ...props }) => {
  return (
    <Button colorScheme={colorScheme} borderRadius="md" shadow="sm" {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
