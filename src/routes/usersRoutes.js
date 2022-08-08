import { Router } from "express";
import validateToken from "../middlewares/tokenValidation.js";
import {getUser,getRanking} from "../controllers/userController.js";

const usersRouter=Router()

usersRouter.get('/users/me',validateToken,getUser)
usersRouter.get('/ranking',getRanking)

export default usersRouter