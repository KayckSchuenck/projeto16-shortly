import { Router } from "express";
import validateAuth from "../middlewares/authValidation.js";
import { signUp,signIn } from "../controllers/authController.js";

const authRouter=Router()

authRouter.post('/signup',validateAuth,signUp)
authRouter.post('/signin',validateAuth,signIn)

export default authRouter