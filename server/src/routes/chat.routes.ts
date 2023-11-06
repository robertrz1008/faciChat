import { Router } from "express";
import { createChatPrivateRequest, getChatsPrivateRequest, getUserByFilter } from "../controllers/chatController";
import { authRequired } from "../middleware/validatorToken";

const chatRoute = Router()

chatRoute.get("/chat", authRequired, getChatsPrivateRequest)
chatRoute.post("/chat",  authRequired, createChatPrivateRequest)
chatRoute.get("/user/:str", authRequired, getUserByFilter)
export default chatRoute