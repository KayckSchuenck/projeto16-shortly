import connection from "../database.js"

async function getUser(userId) {
	return connection.query(`SELECT urls.id AS "urlId",urls.url,urls."shortUrl",urls.views AS "visitCount",users.id,users.name
    FROM urls
    JOIN users
    ON users.id=urls."userId"
    WHERE "userId"=$1
    `,[userId])
}

async function getRanking(){
   return connection.query('SELECT users.id,users.name,SUM(urls.views) as "visitCount",COUNT(urls."shortUrl") as "linksCount" FROM users LEFT JOIN urls ON users.id=urls."userId" GROUP BY users.id ORDER BY "linksCount" DESC LIMIT 10')  
}

export const userRepository = {
	getUser,
    getRanking
}