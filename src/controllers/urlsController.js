import { nanoid } from 'nanoid'
import {schemaPostUrl} from "../schemas/postUrlSchema.js"

export async function deleteUrl(req,res){
    const {userId}=res.locals
    const {url}=req.params

    try{
        const {rows:shortUrl}=await connection.query('SELECT "shortUrl",userId FROM urls WHERE "shortUrl"=$1',[url])

        if(shortUrl.length===0) return res.sendStatus(404)
        if(shortUrl.userId!==userId) return res.sendStatus(401)

        await connection.query('DELETE FROM urls WHERE "shortUrl"=$1',[url])

        res.sendStatus(204)

    } catch(e){
      res.status(500).send('Erro com o servidor')
    } 
}

export async function postUrl(req,res){
  
  const {userId}=res.locals
  const {url}=req.body

  try{
    const validation=schemaPostUrl.validate(req.body)
    if(validation.error) return res.status(422).send("Erro com o objeto enviado")

    const response={
      shortUrl:nanoid()
    }

    await connection.query('INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)',[url,response.shortUrl,userId])

    res.status(201).send(response)

  } catch(e){
      res.status(500).send('Erro com o servidor')
  }  
}

export async function getUrlbyId(req,res){
  const {id}=req.params

  try{
    const {rows:urlTable}=await connection.query('SELECT id,"shortUrl",url FROM urls WHERE id=$1',[id])

    if(urlTable.length===0) return res.sendStatus(404)

    res.status(200).send(urlTable)

  } catch(e){
      res.status(500).send('Erro com o servidor')
  } 
}

export async function redirectUrl(req,res){
  const {shortUrl}=req.params
  
  try{
    const {rows:requiredUrl} = await connection.query('SELECT url,"shortUrl" FROM urls WHERE "shortUrl"=$1',[shortUrl])

    if(requiredUrl.length===0) return res.sendStatus(404)

    const updatedViews=requiredUrl.views+1
    await connection.query('UPDATE urls SET views=$1 WHERE "shortUrl"=$2',[updatedViews,shortUrl])

    res.redirect(requiredUrl.url)

  } catch(e){
      res.status(500).send('Erro com o servidor')
  } 
}