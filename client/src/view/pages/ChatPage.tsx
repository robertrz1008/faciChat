import { useParams } from "react-router-dom"
import Header from "../components/conversation/Header"
import MessageList from "../components/conversation/MessageList"
import Form from "../components/conversation/Form"
import { useEffect, useState } from "react"

function ChatPage(): JSX.Element {

  const {id, name, imgId} = useParams()

  console.log(imgId)
  return ( 
    <div className="chat-body">
      <Header
          name={name}
          imgId={imgId}
      />
      <MessageList 
            id={id}
      /> 
      <Form
          id={id}
      />
    </div>
  )
}

export default ChatPage