import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AppContext'
import { AppContextIn } from '../../../interfaces/contextInterfaces'
import { render } from 'react-dom'

function Profile() {

  const {user, getProfile} = useAuth() as AppContextIn

  useEffect(() => {
    getProfile()
  }, [])

  const renderProfile = () => {

        if(!user || Object.keys(user).length == 0){

          return <h3>Cargando...</h3>

        }else{

          return (
              <div className='panel-profile'>
                  <div>
                        <h2>{user.name}</h2>
                        <h2>more</h2>
                  </div>
              </div>
          )
        }
  }
  return <>{renderProfile()}</>
}

export default Profile