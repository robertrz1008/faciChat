import { useState , createContext, useContext, useEffect } from "react"
import { User, contexArg } from "../interfaces/contextInterfaces"
import { getProfileRequest, loginRequest, registerRequest, vefifyTokenRequest } from "../api/authRequest"
import axios from "axios"
import Cookies from "js-cookie"

const appContext = createContext({})

export const useAuth = () => {
    const context = useContext(appContext)
    if(!context){
        throw new Error("Context invalid")
    }
    return context
}

export function AppContextProvider({children}: contexArg) {
    const [user, setUser] = useState({})
    const [errors, setErrors] = useState()
    const [isAutenticate, setIstAutenticate] = useState(false)
    const [authLoading, setAuthLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    //funciones
    const singUp = async (user: User) => {
        setAuthLoading(true)
        try {
            const res = await registerRequest(user)
            setAuthLoading(false)
            setUser(res.data)
            setIstAutenticate(true)
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error)
                setAuthLoading(false)
                setErrors(error.response?.data)
            }
        }
    }

    const singIn = async (user: User) => {
        setAuthLoading(true)
        try {
            const res = await loginRequest(user)
            setAuthLoading(false)
            setIstAutenticate(true)
        } catch (error) {
            if(axios.isAxiosError(error)){
                setAuthLoading(false)
                console.log(error)
                setErrors(error.response?.data)
            }
        }
    }

    const checkLogin = async () => {
        const cookies = Cookies.get()
        setLoading(true)
        if(!cookies.token){
            setIstAutenticate(false)
            setLoading(false)
            console.log("NO hay token")
            return
        }
        try {
            const response = await vefifyTokenRequest()
            if(!response.data){
                setIstAutenticate(false)
                setLoading(false)
                return
            }
            setIstAutenticate(true)
            setLoading(false)
            setUser(response.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const getProfile = async () => {
        try {
            const res = await getProfileRequest()
            setUser(res.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])
    
    


  return (
    <appContext.Provider value={{
        singUp,
        singIn,
        isAutenticate,
        loading,
        authLoading,
        user,
        getProfile,
        errors
    }}>
        {children}
    </appContext.Provider>
  )
}
