import connection from "../src/database.js";
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

export async function signUp (req,res){
    const {name,email,password}=req.body

    try{
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
        const {rows:userExists}=await connection.query('SELECT email,password,id FROM users WHERE email=$1',[email])

        if(userExists.length!==0||!bcrypt.compareSync(password,userExists.password)) return res.sendStatus(401)

        const token=uuid()
        await connection.query("INSERT INTO sessions ('userId',token) VALUES ($1,$2)",[userExists.id,token])
        
        res.status(200).send(token)

    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}
