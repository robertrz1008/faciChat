import {useState, useEffect } from 'react'
import { useChat } from '../../../context/ChatContext'
import { AppContextIn, ChatContextIn } from '../../../interfaces/contextInterfaces'
import { Props } from '../../../interfaces/ReactStatusInterface'
import "../../css/MessageList.css"
import "../../css/MessageCard.css"
import { useAuth } from '../../../context/AppContext'
import getDate from '../../../utils/date'

function  MessageList({id}: Props){
  const {getMessages, messages, } = useChat() as ChatContextIn
  const {user} = useAuth() as AppContextIn

  let chatId = id

  useEffect(() => {
    getMessages(chatId)
  }, [chatId])


  function aut(userId: number){
    if(userId == user.id){
        return true
    }else{
        return false
    }
  }

  if(messages.length == 0){

    return <h1>cargando...</h1>

  }else{
    return (
      <div className='List-container'>
      {
         messages.map((data) =>(
          //MENSAJE
          <div className={`card ${aut(data.usuario_id) ? `msg-local` : `msg-global`}`} key={data.mensaje_id}>
              <div className={`text ${aut( data.usuario_id) ? `text-local` : `text-global`}`}>
                  <p className={data.message == "Mensaje eliminado" ? "msg-delet" : "" }>{data.message}</p>
                  {/* {
                  data.local ? (
                      <AiOutlineDelete onClick={handleShow}/>
                  ): ("") */}
                  {/* } */}
              </div>
              <p style={{ fontSize: "10px" }}>{getDate(data.fecha_creacion)}</p>
          </div>
        ))
      }
      </div>
    )
   
  }
}

export default MessageList