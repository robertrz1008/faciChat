import { useState , createContext, useContext } from "react"
import { User, contexArg } from "../interfaces/contextInterfaces"
import { loginRequest, registerRequest } from "../api/authRequest"
import axios from "axios"

const appContext = createContext({})

export const useAuth = () => {
    const context = useContext(appContext)
    if(!context){
        throw new Error("Context invalid")
    }
    return context
}

export function AppContextProvider({children}: contexArg) {
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState()

    //funciones
    const singUp = async (user: User) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error)
                setErrors(error.response?.data)
            }
        }
    }

    const singIn = async (user: User) => {
        try {
            const res = await loginRequest(user)
            console.log(res.data)
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error)
                setErrors(error.response?.data)
            }
        }
    }


  return (
    <appContext.Provider value={{
        singUp,
        singIn,
        users,
        errors
    }}>
        {children}
    </appContext.Provider>
  )
}
