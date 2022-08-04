import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js'
import urlsRouter from './routes/urlsRoutes.js'
import usersRouter from './routes/usersRoutes.js'

dotenv.config()

const server=express()
server.use(cors())
server.use(json())
server.use(authRouter)
server.use(urlsRouter)
server.use(usersRouter)

server.listen(process.env.PORT)