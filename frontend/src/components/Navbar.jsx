import React from 'react';
import { Box, Heading, List, ListItem, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box
      as="nav"
      bg="teal.500"
      color="white"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      height="100vh"
      width="250px"
      position="fixed"
    >
      <Heading as="h2" size="md" mb={4}>
        Menu
      </Heading>
      <List spacing={3}>
        <ListItem>
          <Link href="/" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/generate-blog" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            Generate Blog
          </Link>
        </ListItem>
        {/* 他のメニュー項目を追加できます */}
        <ListItem>
          <Link href="/blog-to-tweet" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            Blog to Tweet
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/improve_blog_content" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            Blog Improvement
          </Link>
        </ListItem>        
      </List>
    </Box>
  );
};

export default Navbar;
