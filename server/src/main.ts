import express from "express"
import { Request, Response } from "express-serve-static-core"
import { PORT } from "./utils/config"

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("hola desde el servidor")
})

app.listen(PORT, () =>{
    console.log("server on port 3000")
})