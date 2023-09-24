import {useEffect} from 'react'
import { useChat } from '../../../context/ChatContext'
import { Link } from 'react-router-dom'
import { ChatContextIn } from '../../../interfaces/contextInterfaces' 

function ChatsList() {

  const {chats, getChats} = useChat() as ChatContextIn

  useEffect(() => {
    getChats()
  }, [])

  if(!chats || chats.length == 0){

      return <div className='chat-list'></div>

  }else{
    return (
        <div className='chat-list'>
          {
            chats.map((chat) => (
              <Link to={`conversation/${chat.chat_id}`} key={chat.chat_id}>
                  <div className='chat-target'>
                      <h3>{chat.user_name}</h3>
                      <p>{chat.latest_message_content}</p>
                  </div>
              </Link>
            ))
          }
        </div>
      )
  }
  
  // 
}

export default ChatsList