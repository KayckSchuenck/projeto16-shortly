import { schemaLogin } from "../schemas/schemas.js"

export default async function validateLogin(req,res,next){
    try{
        const validation=schemaLogin.validate(req.body)
        if(validation.error) return res.status(422).send("Erro com o objeto enviado")
        next()

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}