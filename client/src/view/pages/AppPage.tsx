import { Navigate, Link, Outlet } from "react-router-dom"
import ChatsPanel from "./ChatsPanel"
import ChatPage from "./ChatPage"
import "../css/AppPage.css"

function AppPage() {
  return (
    <div className="app-body">
      <ChatsPanel/>
      <div className="app-chat">
        <Outlet/>
      </div>
    </div>
  )
}

export default AppPage

