import connection from "../src/database.js";
import joi from 'joi'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

export async function signUp (req,res){
    const schemaAuth=joi.object({
        name:joi.string().required(),
        confirmPassword:joi.string().required()
    })
    const {name,email,password,confirmPassword}=req.body

    try{
        const validation=schemaAuth.validate(req.body)
        if(validation.error||password!==confirmPassword) return res.status(422).send("Erro com o objeto enviado ou senhas conflitantes")

        const emailAlreadyExists=await connection.query('SELECT email FROM users WHERE email=$1',[email])
        if(emailAlreadyExists.rows.length!==0) return res.sendStatus(409)

        const hashPassword=bcrypt.hashSync(password, 10);
        await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',[name,email,hashPassword])

        res.sendStatus(201)

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}

export async function signIn (req,res){
    const {email,password}=req.body

    try{
        const userExists=await connection.query('SELECT email,password FROM users WHERE email=$1',[email])
        if(userExists.rows.length!==0||!bcrypt.compareSync(password,userExists.rows.password)) return res.sendStatus(401)

        const token=uuid()
        res.status(200).send(token)
        
    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}
