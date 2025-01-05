import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import Navbar from './components/Navbar';
import GenerateBlogHome from './pages/GenerateBlogHome';
import BlogToTweet from './pages/BlogToTweet';
import ImproveBlogContent from './pages/ImproveBlogContent';
import Top from './pages/Top';
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
  { path: '/', element: <Top /> },
  { path: '/generate-blog', element: <GenerateBlogHome /> },
  { path: '/blog-to-tweet', element: <BlogToTweet /> },
  { path: '/improve_blog_content', element: <ImproveBlogContent /> },
]);

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
