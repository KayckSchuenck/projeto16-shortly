import { schemaSignUp } from "../schemas/postUrlSchema.js";
import connection from "../database.js";

export default async function validateSignUp(req,res,next){
    const {password,confirmPassword}=req.body
    
    try{
        const validation=schemaSignUp.validate(req.body)
        if(validation.error||password!==confirmPassword) return res.status(422).send("Erro com o objeto enviado ou senhas conflitantes")
    
        const emailAlreadyExists=await connection.query('SELECT email FROM users WHERE email=$1',[email])
        if(emailAlreadyExists.rows.length!==0) return res.sendStatus(409)

        next()

    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}
