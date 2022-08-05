import { Router } from "express";
import validateAuth from "../middlewares/authValidation.js";
import { signUp,signIn } from "../controllers/authController.js";
import validateSignUp from "../middlewares/signUpValidation.js";

const authRouter=Router()

authRouter.post('/signup',validateAuth,validateSignUp,signUp)
authRouter.post('/signin',validateAuth,signIn)

export default authRouter