import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Button } from '@chakra-ui/react';

const BlogPreviewModal = ({ isOpen, onClose, blogContent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Blog Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
            shadow="sm"
            // HTML形式のブログ内容を直接レンダリング
            dangerouslySetInnerHTML={{ __html: blogContent }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BlogPreviewModal;
