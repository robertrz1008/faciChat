import express from "express"
import { PORT, socketMsg } from "./utils/config"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import autRoute from "./routes/auth.routes"
import msgRoute from "./routes/message.routes"
import proRoute from "./routes/profile.routes"
import chatRoute from "./routes/chat.routes"
import { Server} from "socket.io"
import path from "path"

const app = express()
const server = http.createServer(app) 
export const socket = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "dbImages")))


//socket configuracion
socket.on("connection", (socket) => {
    console.log("user connected")

    socket.on(socketMsg.post, messages => {
        socket.broadcast.emit(socketMsg.post, messages)
    })
})

app.use("/api", autRoute) 
app.use("/api", msgRoute)
app.use("/api", chatRoute)
app.use("/api", proRoute)


server.listen(PORT, () =>{
    console.log(`server starting, http://localhost:${PORT}/`)
})