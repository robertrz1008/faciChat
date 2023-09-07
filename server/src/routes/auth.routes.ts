import { Request, Response, Router } from "express";
import { getUsersRequest, loginRrquest, registerRequest } from "../controllers/authController";

const autRoute = Router()

autRoute.get("/user/:id", getUsersRequest)
autRoute.post("/register", registerRequest)
autRoute.post("/login/", loginRrquest)
autRoute.post("/logout")
autRoute.get("/profile")

export default autRoute