import {useEffect} from 'react'
import { useChat } from '../../../context/ChatContext'
import { useNavigate } from 'react-router-dom'
import { ChatContextIn } from '../../../interfaces/contextInterfaces'
import ChatUserImg from './ChatUserImg'

function ChatsList() {

  const {chats, getChats} = useChat() as ChatContextIn
  const navigate = useNavigate()

  useEffect(() => { 
    if(chats.length == 0){
      getChats()
    }
  }, [])

  if(!chats || chats.length == 0){

      return <div className='chat-list'></div>

  }else{
    return (
        <div className='chat-list'>
          {
            
            chats.map((chat) => (
                  <div 
                    onClick={() => {
                      navigate(`/chat/conversation/${chat.chat_id}/${chat.user_name}/${chat.id_image}`)
                    }}
                    className='chat-target' 
                    key={chat.chat_id}>
                      <div style={{width: "47px", height: "47px"}}>
                        <ChatUserImg
                                userId = {chat.id_image}
                        />
                      </div>
                      <div className='chat-target-texts' style={{marginLeft: "10px",}}>
                          <h3>{chat.user_name}</h3>
                          <h5>{chat.latest_message_content}</h5>
                      </div>
                  </div>
            ))
          }
        </div>
      )
  }
  
  // 
}

export default ChatsList