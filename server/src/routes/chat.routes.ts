import { Router } from "express";
import { createChatPrivateRequest, getChatsPrivateRequest } from "../controllers/chatController";
import { authRequired } from "../middleware/validatorToken";

const chatRoute = Router()

chatRoute.get("/chat", authRequired, getChatsPrivateRequest)
chatRoute.post("/chat",  authRequired, createChatPrivateRequest)

export default chatRoute