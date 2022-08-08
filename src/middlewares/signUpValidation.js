import { validationRepository } from "../repositories/validationRepository.js";
import { schemaSignUp } from "../schemas/schemas.js";

export default async function validateSignUp(req,res,next){
    const {password,confirmPassword,email}=req.body
    
    try{
        const validation=schemaSignUp.validate(req.body)
        if(validation.error||password!==confirmPassword) return res.status(422).send("Erro com o objeto enviado ou senhas conflitantes")
    
        const emailAlreadyExists=await validationRepository.signUpValidation(email)
        if(emailAlreadyExists.rows.length!==0) return res.sendStatus(409)

        next()

    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}
