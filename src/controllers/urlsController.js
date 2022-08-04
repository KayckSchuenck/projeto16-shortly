import connection from "../database"

export async function deleteUrl(req,res){
    const {userId}=res.locals
    const {url}=req.params
    try{

        const shortUrl=await connection.query('SELECT shortUrl,userId FROM urls WHERE shortUrl=$1',[url])

        if(shortUrl.rows.length===0) return res.sendStatus(404)
        if(shortUrl.rows.userId!==userId) return res.sendStatus(401)

        await connection.query('DELETE FROM urls WHERE shortUrl=$1',[url])

        res.sendStatus(204)

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}