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
        {/* 他のメニュー項目を追加できます */}
        <ListItem>
          <Link href="/about" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            About
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/contact" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            Contact
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Navbar;
