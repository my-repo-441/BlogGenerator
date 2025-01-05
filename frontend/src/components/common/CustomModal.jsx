import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

const CustomModal = ({ isOpen, onClose, title, children, ...props }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
