import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import "../../css/Modal.css"
import { useAuth } from '../../../context/AppContext';
import { AppContextIn } from '../../../interfaces/contextInterfaces';
import ProfileConfig from '../profile/ProfileConfig';
import ProfileForm from '../profile/ProfileForm';

type ModalProp = {
  handleClose: () => void;
  openModal: boolean;
}

function ModalProfile({ handleClose, openModal }: ModalProp): JSX.Element {

  const [isForm, setIsForm] = useState(true)

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '10px' }}>
        <div className='modal-con'>
            {
              !isForm? ( <ProfileConfig/> ) : (<ProfileForm/>)
            }
        </div>
      </div>
    </Modal>
  );
}

export default ModalProfile;