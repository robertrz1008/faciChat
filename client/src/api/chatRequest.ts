import { createMsg } from "../interfaces/contextInterfaces"
import axios from "./axios"

export const getChatsRequest = () => axios.get("chat")

export const getMessageRequest = (id: number) => axios.get(`message/${id}`)

export const createMessageRequest = (message: createMsg) => axios.post(`message`, message)