import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FetchContent from './pages/FetchContent';
import { ChakraProvider, Container, Box } from '@chakra-ui/react';

const Layout = ({ children }) => (
  <Box>
    <Navbar />
    {/* Navbar の幅に合わせて左側の余白を設定 */}
    <Box ml="250px">
      <Container maxW="container.lg" py={6}>
        {children}
      </Container>
    </Box>
  </Box>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/fetch-content',
    element: (
      <Layout>
        <FetchContent />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
