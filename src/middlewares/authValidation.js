import { schemaAuth } from "../schemas/schemas"

export default async function validateAuth(req,res,next){
    
    try{
        const validation=schemaAuth.validate(req.body)
        if(validation.error) return res.status(422).send("Erro com o objeto enviado")
        next()

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}