import { Router } from "express";

const urlsRouter=Router()

urlsRouter.get('/urls/:id',getUrlbyId)
urlsRouter.get('/urls/open/:shortUrl',redirectUrl)
urlsRouter.post('/urls/shorten',postUrl)
urlsRouter.delete('/urls/:id',deleteUrl)

export default urlsRouter