import { createContext, useContext, useEffect, useState } from "react"
import { Message, contexArg, createMsg } from "../interfaces/contextInterfaces"
import { createMessageRequest, getChatsRequest, getMessageRequest } from "../api/chatRequest"
import io from "socket.io-client"

export const socket = io('http://localhost:4000')

const ChatContex = createContext({})

export const useChat = () => {
    const context = useContext(ChatContex)
    if(!context){
        throw new Error("context invalid")
    }
    return context
}

export function ChatContextProvider({children}: contexArg) {

  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState<Message[]>([])
  const [chatId, setChatId] = useState(0)
  const [msgLoading, setMsgLoading] = useState(false)

  const getChats = async () => {
    try {
      const res = await getChatsRequest()
      setChats(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMessages = async (id: number) => {
    setMsgLoading(true);
    try {
      const res = await getMessageRequest(id);
      console.log('Los mensajes no son iguales');
      setMsgLoading(false);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
      setMsgLoading(false);
    }
  };

  function resiveMessage(msg: Message[]){
    setMessages(msg)
  }

  useEffect(() =>{
    socket.on('createMsg', resiveMessage)

    return () => {
      socket.off('createMsg', resiveMessage)
    }
  },[messages])

  const createMessage = async (message: createMsg) => {
    try {
      const response = await createMessageRequest(message)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ChatContex.Provider value={{
      chats,
      getChats,
      getMessages,
      messages,
      createMessage,
      chatId
    }}>
        {children}
    </ChatContex.Provider>
  )
}
