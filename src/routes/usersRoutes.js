import { Router } from "express";
import validateToken from "../middlewares/tokenValidation";


const usersRouter=Router()

usersRouter.get('/users/me',validateToken,getUser)
usersRouter.get('/ranking',getRanking)

export default usersRouter