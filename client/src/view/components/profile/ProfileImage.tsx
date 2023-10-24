import React, { FC } from 'react'
import { useAuth } from '../../../context/AppContext';
import { AppContextIn } from '../../../interfaces/contextInterfaces';

const ProfileImage: FC =()=>  {

  const {userImg} = useAuth() as AppContextIn

  return (
    <div className='profile-img-con'>
        <div className='img-surraw'>
            <img src={"http://localhost:4000/"+ userImg} width= "300px" height= "auto" className='profile-img'/>
        </div>
    </div>
  )
}


export default ProfileImage