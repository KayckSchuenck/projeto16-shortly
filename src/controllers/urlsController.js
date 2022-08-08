import { nanoid } from 'nanoid'
import {schemaPostUrl} from "../schemas/schemas.js"
import { urlRepository } from '../repositories/urlRepository.js'

export async function deleteUrl(req,res){
    const {userId}=res.locals
    const {id}=req.params
    try{
        const {rows:shortUrl}=await urlRepository.getShortUrl(id)

        if(shortUrl.length===0) return res.sendStatus(404)
        if(shortUrl[0].userId!==userId) return res.sendStatus(401)

        await urlRepository.deleteUrl(id)
        res.sendStatus(204)

    } catch(e){
      console.log(e)
      res.status(500).send('Erro com o servidor')
    } 
}

export async function postUrl(req,res){
  const {userId}=res.locals
  const {url}=req.body

  try{
    const validation=schemaPostUrl.validate(req.body)
    if(validation.error) return res.status(422).send("Erro com o objeto enviado")

    const hashUrl=nanoid()
    await urlRepository.postUrl(url,hashUrl,userId)

    res.status(201).send(hashUrl)

  } catch(e){
      res.status(500).send('Erro com o servidor')
  }  
}

export async function getUrlbyId(req,res){
  const {id}=req.params

  try{
    const {rows:urlTable}=await urlRepository.getUrlbyId(id)
    if(urlTable.length===0) return res.sendStatus(404)

    res.status(200).send(urlTable)

  } catch(e){
      res.status(500).send('Erro com o servidor')
  } 
}

export async function redirectUrl(req,res){
  const {shortUrl}=req.params
  
  try{
    const {rows:requiredUrl} = await urlRepository.redirectUrl(shortUrl)
    if(requiredUrl.length===0) return res.sendStatus(404)

    const updatedViews=Number(requiredUrl[0].views)+1
    await urlRepository.updateUrl(updatedViews,shortUrl)

    res.redirect(requiredUrl.url)

  } catch(e){
      console.log(e)
      res.status(500).send('Erro com o servidor')
  } 
}