import { Router } from "express";

const authRouter=Router()
authRouter.post('/signup',signUp)
authRouter.post('/signin',signIn)

export default authRouter