import React from 'react';
import { Input } from '@chakra-ui/react';

const CustomInput = ({ placeholder, value, onChange, type = 'text', size = 'md', ...props }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      size={size}
      borderRadius="md"
      shadow="sm"
      {...props}
    />
  );
};

export default CustomInput;
