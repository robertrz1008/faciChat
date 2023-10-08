import React, {useEffect, useCallback, useState } from 'react'
import { AppContextIn, ChatContextIn, createMsg } from '../../../interfaces/contextInterfaces'
import { useChat } from '../../../context/ChatContext'
import { useAuth } from '../../../context/AppContext'
import { Props } from '../../../interfaces/ReactStatusInterface'

function Form({id}: Props) {
  const {createMessage, getMessages, messages} = useChat() as ChatContextIn
  const {user} = useAuth() as AppContextIn

  let getId= Number(id)

  const [msgText, setMsgText,] = useState("")


  function hanldeSubmit(){
    if (msgText.length == 0) {
      return
    }else{
       const userId: number | any= user.id
      let myMessage: createMsg = {
          containe: msgText,
          id_user: userId,
          id_chat:getId,
      }
      createMessage(myMessage)
      setMsgText("")
    }
  }

  return (
    <form 
        id="form"
        onSubmit={(e) => {
          e.preventDefault()
          hanldeSubmit()
        }}
    >
        <textarea id="input" value={msgText} onChange={(e) => setMsgText(e.target.value)}></textarea>
        <button>Send</button>
    </form>
  )
}

export default Form