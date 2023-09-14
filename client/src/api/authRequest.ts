import { User } from "../interfaces/contextInterfaces.ts"
import axios from "./axios.ts"

export const registerRequest = (user: User) => axios.post("/register", user)

export const loginRequest = (user: User) => axios.post("/login", user)