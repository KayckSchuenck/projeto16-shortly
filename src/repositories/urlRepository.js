import connection from "../database.js"

async function deleteUrl(id){
    return connection.query('DELETE FROM urls WHERE id=$1',[id])
}

async function getShortUrl(id){
    return connection.query('SELECT "shortUrl","userId" FROM urls WHERE id=$1',[id])
}

async function postUrl(url,shortUrl,userId){
    return connection.query('INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)',[url,shortUrl,userId])
}

async function getUrlbyId(id){
    return connection.query('SELECT id,"shortUrl",url FROM urls WHERE id=$1',[id])
}

async function redirectUrl(shortUrl){
    return connection.query('SELECT views,url,"shortUrl" FROM urls WHERE "shortUrl"=$1',[shortUrl])
}

async function updateUrl(updatedViews,shortUrl){
    return connection.query('UPDATE urls SET views=$1 WHERE "shortUrl"=$2',[updatedViews,shortUrl])
}

export const urlRepository = {
	deleteUrl,
    getShortUrl,
    postUrl,
    getUrlbyId,
    redirectUrl,
    updateUrl
}