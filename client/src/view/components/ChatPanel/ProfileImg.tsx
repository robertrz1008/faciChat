import React, { FC } from 'react'
import { useAuth } from '../../../context/AppContext'
import { AppContextIn } from '../../../interfaces/contextInterfaces'
import "../../css/profileImgMin.css"

type Props={
  file:string
}
const ProfileImg: FC<Props> = ({file}) =>  {


  return (
    <div className='chatPanel-img-con'>
        <div className='panel-img-surraw'>
            { file && <img src={"http://localhost:4000/" + file} alt="..." width= "180%" height= "auto" />}
        </div>
    </div>
  )
}

export default ProfileImg