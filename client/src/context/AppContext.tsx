import { useState , createContext, useContext, useEffect } from "react"
import { User, contexArg } from "../interfaces/contextInterfaces"
import { getProfileRequest, loginRequest, logoutRequest, registerRequest, vefifyTokenRequest } from "../api/authRequest"
import axios from "axios"
import Cookies from "js-cookie"
import { getImageByIdRequest } from "../api/profileRequest"

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
    const [userImg, setUserImg] = useState(String)
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
            await loginRequest(user)
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

    const logout = async() => {
        try {
            await logoutRequest()
            setIstAutenticate(false)
        } catch (error) {
            console.log(error)
        }
    }
    //profile
    const getProfile = async () => {
        try {
            const res = await getProfileRequest()
            setUser(res.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    const getImgProfile = async(id: number) => {
        try {
            const file = await getImageByIdRequest(id)
            setUserImg(file.data)
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
        userImg,
        getProfile,
        getImgProfile,
        logout,
        errors
    }}>
        {children}
    </appContext.Provider>
  )
}
