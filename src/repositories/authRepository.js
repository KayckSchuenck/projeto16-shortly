import connection from "../src/database.js";

async function signUp(name,email,hashPassword){
    return connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',[name,email,hashPassword])
}

async function signInCheck(email){
    return connection.query('SELECT email,password,id FROM users WHERE email=$1',[email])
}

async function signInPost(id,token){
    return connection.query("INSERT INTO sessions ('userId',token) VALUES ($1,$2)",[id,token])
        
}

export const authRepository = {
	signUp,
    signInCheck,
    signInPost
}