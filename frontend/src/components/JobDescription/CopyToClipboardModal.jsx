import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const CopyToClipboardModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <h2 id="modal-modal-title" className='ml-2'>URL Copied</h2>
        <p id="modal-modal-description" className='ml-2 mt-2'>The URL has been copied to your clipboard.</p>
        <p id="modal-modal-description" className='ml-2 mt-2'>Share the URL with your friends!</p>
        <Button onClick={onClose} >Close</Button>
      </Box>
    </Modal>
  );
};

export default CopyToClipboardModal;