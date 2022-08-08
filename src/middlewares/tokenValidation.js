import { validationRepository } from "../repositories/validationRepository.js"

export default async function validateToken(req,res,next){
    const {authorization}=req.headers
    const token=authorization.replace("Bearer ","")

    try{
        const {rows:session}=await validationRepository.tokenValidation(token)
        if(session.length===0) return res.status(401).send("Erro com o token enviado")

        res.locals.userId=session[0].userId
        next()

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}