import { Router } from "express";
import { createMessage, deleteMessage, getMessagesbyUser } from "../controllers/messageController";
import { authRequired } from "../middleware/validatorToken";

const msgRoute = Router()

msgRoute.get("/message", authRequired, getMessagesbyUser)
msgRoute.post("/message", authRequired, createMessage)
msgRoute.put("/message:id")
msgRoute.delete("/message/:id", authRequired, deleteMessage)

export default msgRoute