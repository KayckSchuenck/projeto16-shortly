import { userRepository } from "../repositories/userRepository"

export default async function getUser(req,res) {
    const{userId}=res.locals

    try{
        const {rows:userUrlQuery}=await userRepository.getUser(userId)

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

export default async function getRanking(req,res) {
    try{
        const body=await userRepository.getRanking()
        res.status(200).send(body)
    } catch(e){
        res.status(500).send('Erro com o servidor')
    } 
}
