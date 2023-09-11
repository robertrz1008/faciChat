import express from "express"
import { PORT } from "./utils/config"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import autRoute from "./routes/auth.routes"
import '@fontsource/roboto/400.css';
import msgRoute from "./routes/message.routes"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use(autRoute)
app.use(msgRoute)


app.listen(PORT, () =>{
    console.log(`server starting, http://localhost:${PORT}/`)
})