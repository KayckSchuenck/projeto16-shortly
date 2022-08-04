import { Router } from "express";


const usersRouter=Router()

usersRouter.get('/users/me',getUser)
usersRouter.get('/ranking',getRanking)

export default usersRouter