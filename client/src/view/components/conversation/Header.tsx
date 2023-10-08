import { useAuth } from "../../../context/AppContext"
import { useChat } from "../../../context/ChatContext"
import { Props } from "../../../interfaces/ReactStatusInterface"
import { AppContextIn, ChatContextIn } from "../../../interfaces/contextInterfaces"

const  Header: React.FC<Props> = ({name})  => {
  return (
    <div className="chat-header">
      <h2>{name}</h2>
    </div>
  )
}

export default Header