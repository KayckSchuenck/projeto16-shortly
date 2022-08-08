import connection from "../database.js";

async function signUpValidation(email){
    return connection.query('SELECT email FROM users WHERE email=$1',[email])
}

async function tokenValidation(token){
    return connection.query('SELECT * FROM sessions WHERE token=$1',[token])
}

export const validationRepository = {
	signUpValidation,
    tokenValidation
}