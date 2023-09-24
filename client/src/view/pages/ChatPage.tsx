import { useParams } from "react-router-dom"
import Header from "../components/conversation/Header"
import MessageList from "../components/conversation/MessageList"
import Form from "../components/conversation/Form"

function ChatPage() {

  const {id} = useParams()

  return (
    <div className="chat-body">
      <Header/>
      <MessageList/>
      <Form/>
    </div>
  )
}

export default ChatPage