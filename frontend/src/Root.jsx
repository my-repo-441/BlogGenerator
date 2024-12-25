import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

// 必要に応じてテーマをカスタマイズ
const theme = extendTheme({});

const Root = () => (
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

export default Root;
