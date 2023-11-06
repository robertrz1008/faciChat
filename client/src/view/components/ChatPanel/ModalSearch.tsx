import { ChangeEvent, useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import "../../css/ModalSearch.css"
import { useChat } from '../../../context/ChatContext';
import { ChatContextIn } from '../../../interfaces/contextInterfaces';
import UsersList from './usersList';

type ModalProp = {
    handleCloseSM: () => void;
    openSearchModal: boolean;
    modalClose: boolean
}

function ModalSearch({handleCloseSM, openSearchModal, modalClose}: ModalProp): JSX.Element {
  
  const {userList, getUserByFilter, cleanUsersList} = useChat() as ChatContextIn
  const [isDisabled, setIsDesabled] = useState(true)
  const [btnText, setBtnText] = useState("")

  const buttonOff = () => setIsDesabled(true)
  const buttonOn = () => setIsDesabled(false)

  function handleSubmit(e: ChangeEvent<HTMLInputElement>){
    const input = e.target.value
    const rg = /[\s*]$/

    if(input.length == 0){
      return cleanUsersList()
    }
    if(rg.test(input)){
      getUserByFilter(input)
      return
    }
    getUserByFilter(input)
  }
  function hanldeSelect(name: string, idImage: number){
    console.log({name, idImage})
    setBtnText(name)
    buttonOn()
  }

  useEffect(() => {
    if(modalClose){
      buttonOff()
      setBtnText("")
      console.log("cerrado")
    }
  }, [modalClose])

  return (
    <Modal
      open={openSearchModal}
      onClose={handleCloseSM}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
         <div style={{  position: 'absolute',   top: '50%',  left: '50%',  transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '10px' , borderRadius: "10px"
        }}>
            <div className='modal-users-con'>
              <center><h3>Habla con otras personas</h3></center>
              <div 
                onChange={handleCloseSM} 
                style={{cursor:"pointer"}}
                className='modal-users-exit'>
                  <h2>x</h2>
              </div>
                  <input 
                  onChange={handleSubmit}
                  className='modal-users-textfiel' 
                  type="text" 
                  placeholder='Busca'
                  />
              <UsersList usersList={userList} hanldeSelect={hanldeSelect}/>
                <center>
                    <button 
                        onClick={() => console.log("click")} 
                        disabled={isDisabled}
                        className={isDisabled? "buttonOff" : 'button'}
                    >
                      Chat {btnText}
                    </button>
                </center>
            </div>
      </div>
    </Modal>
  );
}

export default ModalSearch;