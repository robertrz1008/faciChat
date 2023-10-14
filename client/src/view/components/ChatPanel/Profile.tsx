import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AppContext';
import { AppContextIn } from '../../../interfaces/contextInterfaces';
import ModalProfile from './ModalProfile';

function Profile(): JSX.Element {
  const { user, getProfile } = useAuth() as AppContextIn;
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const renderProfile = () => {
    if (!user || Object.keys(user).length === 0) {
      return <h3>Cargando...</h3>;
    } else {
      return (
        <div className="panel-profile">
          <div>
            <h2 onClick={handleOpen}>{user.name}</h2>
            <h2>more</h2>
          </div>
          <ModalProfile handleClose={handleClose} openModal={openModal} />
        </div>
      );
    }
  };

  return renderProfile();
}

export default Profile;