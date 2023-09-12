import express from "express"
import { PORT } from "./utils/config"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import autRoute from "./routes/auth.routes"
import msgRoute from "./routes/message.routes"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    
}))

app.use(autRoute)
app.use(msgRoute)


app.listen(PORT, () =>{
    console.log(`server starting, http://localhost:${PORT}/`)
})