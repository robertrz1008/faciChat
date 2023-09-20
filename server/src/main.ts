import express from "express"
import { PORT } from "./utils/config"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import autRoute from "./routes/auth.routes"
import msgRoute from "./routes/message.routes"
import chatRoute from "./routes/chat.routes"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())


app.use("/api", autRoute)
app.use("/api", msgRoute)
app.use("/api", chatRoute)


app.listen(PORT, () =>{
    console.log(`server starting, http://localhost:${PORT}/`)
})