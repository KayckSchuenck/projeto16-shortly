import connection from "../database.js"

export default async function getUser(req,res) {
    const{userId}=res.locals

    try{
        const {rows:userUrlQuery}=await connection.query(`SELECT urls.id AS urlId,urls.url,urls."shortUrl",urls.views AS "visitCount",users.id,users.name
        FROM urls
        JOIN users
        ON users.id=urls."userId"
        WHERE "userId"=$1
        `,[userId])

        if(userUrlQuery.length===0) return res.sendStatus(404)

        const joinBody={
            id:userUrlQuery.id,
            name:userUrlQuery.name,
            visitCount:userUrlQuery.map(e => e.visitCount).reduce((prev, curr) => prev + curr, 0),
            shortenedUrls:userUrlQuery.map(elem=>{
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