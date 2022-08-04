import { Router } from "express";
import validateToken from "../middlewares/tokenValidation.js";
import { deleteUrl } from "../controllers/urlsController.js";

const urlsRouter=Router()

urlsRouter.get('/urls/:id',getUrlbyId)
urlsRouter.get('/urls/open/:shortUrl',redirectUrl)
urlsRouter.post('/urls/shorten',postUrl)
urlsRouter.delete('/urls/:id',validateToken,deleteUrl)

export default urlsRouter