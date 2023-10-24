import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AppContext';
import { AppContextIn } from '../../../interfaces/contextInterfaces';
import ModalProfile from './ModalProfile';
import ProfileImg from './ProfileImg';

function Profile(): JSX.Element {
  const { user, userImg, getProfile,getImgProfile } = useAuth() as AppContextIn;
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  let id= user.id_image

  useEffect(() => {
    if (id) {
      getImgProfile(user.id_image)
    }
  }, [id]);

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
                <div className='panel-profile-con-img' style={{width: "70px", height: "70px",}} onClick={handleOpen}>
                    <ProfileImg 
                            file={userImg}/>
                </div>
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