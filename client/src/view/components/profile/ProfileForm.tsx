import { ChangeEvent, useEffect, useState } from 'react'
import ProfileImage from './ProfileImage'
import { useAuth } from '../../../context/AppContext'
import { AppContextIn } from '../../../interfaces/contextInterfaces'
import ProfileImgForm from './ProfileImgEdit'
import FileInput from './FileInput'
import { changeImagesRequest, createImagesRequest, deleteImageRequest, updateNameProfileRequest } from '../../../api/profileRequest'

type Props = {
  profileFormClose: () => void
}

function ProfileForm({profileFormClose}: Props): JSX.Element{

  const {userImg, user, getProfile, updateNameProfile} = useAuth() as AppContextIn

  const [fileURL, setFileURL] = useState(String)
  const [file, setFile] = useState<File | null>()
  const [myId, setMyId] = useState(user.id_image)
  const [name, setName] = useState<string>("")

  useEffect(() => {
    setName(user.name)
  }, [])

  function selectHandle(e: ChangeEvent<HTMLInputElement>){
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile)
    if(selectedFile){
      const objectURL = URL.createObjectURL(selectedFile)
      setFileURL(objectURL)
    }
  }
  async function removeImgProfile(){
    //la funcion se detiene si la foto de perfil es la de por defecto
    if(user.id_image == 2){
      console.log("el id de imagen es 2")
      return
    }else{

    try {
      const userId= { id: user.id }
      await changeImagesRequest(2, userId)
      await deleteImageRequest(myId)
      alert("Se ha quitado la foto de perfil")
      getProfile()
    } catch (error) {
      console.log(error)
    }

  }
  }

  //subir foto
  const uploadImgProIgm = async ()  => {
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)
    try {
      const response: any = await createImagesRequest(formData)
      const userId= { id: user.id }
      await changeImagesRequest(response.data.id, userId)
      if(myId != 32){
        await deleteImageRequest(myId)
      }
      console.log("ya ha pasado por la condicion del la imagen default")
      getProfile()
    } catch (error) {
      console.log(error)
    }
  }


  async function handleSubmit(){
    uploadImgProIgm()

    if(name == user.name){
      return
    }else{
    const userName= { name: name }
    try {
      await updateNameProfileRequest(user.id, userName)
      getProfile()
      
    } catch (error) {
      console.log(error)
    }
    }
  }


  return (
    <div className='profile-form-body'>
          //imagen
          {
            !fileURL? (<ProfileImage userImg={userImg}/>) : (<ProfileImgForm userImg={fileURL}/>)
          }
          <div className='profile-form-btns'>
              <FileInput selectHandle={selectHandle}/>
              <button 
                onClick={removeImgProfile}
                className='profile-form-btn'>Quitar imagen</button>
          </div>
          
          <div className='profile-form-name'>
              <h3>Nombre de usuario</h3>
              <input 
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
              />
          </div>

          <div className='profile-form-config-btns'>
              <button onClick={() =>{
                profileFormClose()
                setFileURL("")
              }}>
                Cancelar
              </button>
              <button onClick={() =>{
                handleSubmit()
                profileFormClose()
                setFileURL("")
              }}>
                Aceptar
              </button>
          </div>
          
    </div>
  )
}

export default ProfileForm