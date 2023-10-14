import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

type ModalProp = {
  handleClose: () => void;
  openModal: boolean;
}

function ModalProfile({ handleClose, openModal }: ModalProp): JSX.Element {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '10px' }}>
        <h2 id="simple-modal-title">Modal Title</h2>
        <p id="simple-modal-description">
          This is the content of the modal. You can add any content you want here.
        </p>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default ModalProfile;