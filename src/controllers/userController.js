import connection from "../database.js"

export default async function (req,res) {
    const{userId}=res.locals

    try{
        const urlQuery=await connection.query(`SELECT urls.id AS urlId,urls.url,urls."shortUrl",urls.views AS "visitCount",users.id,users.name
        FROM urls
        JOIN users
        ON users.id=urls."userId"
        WHERE "userId"=$1
        `,[userId])

        const joinBody={
            id:urlQuery.rows.id,
            name:urlQuery.rows.name,
            visitCount:urlQuery.map(e => e.visitCount).reduce((prev, curr) => prev + curr, 0),
            shortenedUrls:urlQuery.rows.map(elem=>{
                return {
                    id:elem.urlId,
                    shortUrl,
                    url,
                    visitCount
                }
            })
        }

        res.status(200).send(joinBody)

    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}