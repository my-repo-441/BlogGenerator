import React from 'react';
import CustomModal from '../components/common/CustomModal';

const BlogPreviewModal = ({ isOpen, onClose, blogContent }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Preview Blog">
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{blogContent}</pre>
    </CustomModal>
  );
};

export default BlogPreviewModal;
