import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes'
import urlsRouter from './routes/urlsRoutes'

dotenv.config()

const server=express()
server.use(cors())
server.use(json())
server.use(authRouter)
server.use(urlsRouter)

server.listen(process.env.PORT)