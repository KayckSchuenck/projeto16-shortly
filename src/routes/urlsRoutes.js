import { Router } from "express";
import validateToken from "../middlewares/tokenValidation.js";
import { deleteUrl,getUrlbyId,postUrl,redirectUrl } from "../controllers/urlsController.js";

const urlsRouter=Router()

urlsRouter.get('/urls/:id',getUrlbyId)
urlsRouter.get('/urls/open/:shortUrl',redirectUrl)
urlsRouter.post('/urls/shorten',validateToken,postUrl)
urlsRouter.delete('/urls/:id',validateToken,deleteUrl)

export default urlsRouter