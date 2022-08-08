import { Router } from "express";
import validateLogin from "../middlewares/signInValidation.js";
import { signUp,signIn } from "../controllers/authController.js";
import validateSignUp from "../middlewares/signUpValidation.js";

const authRouter=Router()

authRouter.post('/signup',validateSignUp,signUp)
authRouter.post('/signin',validateLogin,signIn)

export default authRouter