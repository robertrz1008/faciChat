import { useState , createContext, useContext } from "react"
import { User, contexArg } from "../interfaces/contextInterfaces"

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

    const singUp = (user: User) => {
        setUsers(user)
    }

  return (
    <appContext.Provider value={{
        singUp,
        users
    }}>
        {children}
    </appContext.Provider>
  )
}
