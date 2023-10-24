import { useEffect } from "react"
import { useAuth } from "../../../context/AppContext"
import { AppContextIn } from "../../../interfaces/contextInterfaces"
import ProfileImage from "./ProfileImage"

function ProfileConfig(): JSX.Element {
  const {user, userImg, logout, getImgProfile} = useAuth() as AppContextIn


  const imageURL = userImg
  const altText = 'Imagen de perfil'

  return (
    <div className="prof-config">
        <h1>Mi perfil</h1>
        <ProfileImage/>

        <h1>{user.name}</h1>
        <p>{user.email}</p>

        <div className="prof-btns">
            <button>Editar Perfil</button>
            <button onClick={logout}>Serrar session</button>
        </div>
    </div>
  )
}

export default ProfileConfig