import { createContext, useContext, useEffect, useState } from "react"
import { contexArg } from "../interfaces/contextInterfaces"
import { getChatsRequest } from "../api/chatRequest"

const ChatContex = createContext({})

export const useChat = () => {
    const context = useContext(ChatContex)
    if(!context){
        throw new Error("context invalid")
    }
    return context
}
const x = 0

export function ChatContextProvider({children}: contexArg) {

  const [chats, setChats] = useState([])

  const getChats = async () => {
    try {
      const res = await getChatsRequest()
      setChats(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ChatContex.Provider value={{
      chats,
      getChats
    }}>
        {children}
    </ChatContex.Provider>
  )
}
