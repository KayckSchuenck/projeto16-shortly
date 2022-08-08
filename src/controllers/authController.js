import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { authRepository } from '../repositories/authRepository';

export async function signUp (req,res){
    const {name,email,password}=req.body

    try{
        const hashPassword=bcrypt.hashSync(password, 10);
        await authRepository.signUp(name,email,hashPassword)
        
        res.sendStatus(201)

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}

export async function signIn (req,res){
    const {email,password}=req.body

    try{
        const {rows:userExists}=await authRepository.signInCheck(email)
        if(userExists.length!==0||!bcrypt.compareSync(password,userExists.password)) return res.sendStatus(401)

        const token=uuid()
        await authRepository.signInPost(userExists.id,token)

        res.status(200).send(token)

    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}
