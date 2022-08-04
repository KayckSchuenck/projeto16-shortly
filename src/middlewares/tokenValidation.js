import connection from "../database"
import joi from 'joi'

export default async function validateToken(req,res,next){
    const schemaToken=joi.object({
        authorization:joi.string().required()
    })
    
    const validation=schemaToken.validate(req.header)
    if(validation.error) return res.status(401).send("Erro com o token enviado")

    const {authorization}=req.header
    const token=authorization.replace("Bearer ","")

    try{

        const session=await connection.query('SELECT * FROM sessions WHERE token=$1',[token])
        if(session.rows.length===0) return res.status(401).send("Erro com o token enviado")

        res.locals.userId=session.rows.userId
        next()

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}