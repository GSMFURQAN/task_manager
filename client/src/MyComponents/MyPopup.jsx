// CustomModal.js
import React from 'react';
import { Modal, Box } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
}
const MyPopup = ({ open, setOpen, content, addStyles }) => {
    return (
        <Modal open={open} onClose={() => {
            setOpen(false)
        }}>
            <Box sx={{ ...style, ...addStyles }}        >
                {content}
            </Box>
        </Modal>
    );
};

export default MyPopup;
