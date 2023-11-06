import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AppContext';
import { AppContextIn, ChatContextIn } from '../../../interfaces/contextInterfaces';
import ModalProfile from './ModalProfile';
import ProfileImg from './ProfileImg';
import ModalSearch from './ModalSearch';
import { useChat } from '../../../context/ChatContext';

function Profile(): JSX.Element {
  const { user, userImg, getProfile,getImgProfile } = useAuth() as AppContextIn;
  const {cleanUsersList} = useChat() as ChatContextIn

  const [openModal, setOpenModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [modalClose, setModalClose] = useState(false)

  useEffect(() => {
    getProfile();
  }, []);

  let id= user.id_image

  useEffect(() => {
    if (id) {
      getImgProfile(user.id_image)
    }
  }, [id]);

  //Modals
  function handleOpen() { 
    setOpenModal(true);
  };
  function handleClose() {
    setOpenModal(false);
  };
  function handleOpenSM() { 
    setOpenSearchModal(true);
    setModalClose(false)
  };
  function handleCloseSM() {
    setOpenSearchModal(false);
    setModalClose(true) // al serrar el modal
    cleanUsersList() // vacia la lista
  };

  const renderProfile = () => {
    if (!user || Object.keys(user).length == 0) {
      return <h3>Cargando...</h3>;
    } else {
      return (
        <div className="panel-profile">
            <div>
                <div className='panel-profile-con-img' style={{width: "70px", height: "70px",}} onClick={handleOpen}>
                    <ProfileImg 
                            file={userImg}/>
                </div>
            <h2 style={{cursor:"pointer"}} onClick={handleOpenSM}>more</h2>
            </div>
            {/* modales */}
            <ModalProfile 
                    handleClose={handleClose} 
                    openModal={openModal} 
            />
            <ModalSearch 
                    handleCloseSM={handleCloseSM} 
                    openSearchModal={openSearchModal}
                    modalClose={modalClose}
            />
        </div>
      );
    }
  };

  return renderProfile();
}

export default Profile;