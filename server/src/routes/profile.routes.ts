import { Router } from "express";
import { createImageProfile, deleteImageProdile, getImagesProfilebyId, changeUserImageProfile, updateName } from "../controllers/profile.Controller";
import upload from "../middleware/upload";

const proRoute = Router();

proRoute.get("/profile/image/:id", getImagesProfilebyId)
proRoute.post("/profile/image", upload, createImageProfile)
proRoute.put("/profile/:id", changeUserImageProfile)
proRoute.delete("/profile/image/:id", deleteImageProdile)
export default proRoute