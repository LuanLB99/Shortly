import connection from "../connection.js";
import { nanoid } from 'nanoid';

async function postURL(req, res){
    const { url } = req.body;
    const shortURL = nanoid();
    const id = res.locals.user;
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  if(!isValidUrl(url)){return res.sendStatus(422)}

    try {
        const encurtUrl = await connection.query('INSERT INTO links (shortUrl, url, userid) VALUES ($1,$2,$3);',[shortURL, url, id]);
        return res.send({shortUrl:shortURL});
    } catch (error) {
       return res.status(422).send(error.message);
    }

}

async function getUrl(req, res){
    const { id } = req.params;
    try {
        const url = await connection.query('SELECT * FROM links WHERE id=$1;',[id])
        if(!url.rows[0]){return res.sendStatus(404)}
        return res.status(200).send(url.rows[0]);
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
}

async function redirect(req, res){
    const { shortUrl } = req.params;

    try {
        const UrlExist = await connection.query('SELECT * FROM links WHERE shorturl=$1;',[shortUrl])
        if(!UrlExist.rows[0]){return res.sendStatus(404)};
      
        const linkId = UrlExist.rows[0].id;
        const visits = UrlExist.rows[0].visits + 1;
        const newVistit = connection.query('UPDATE links SET visits=$1 WHERE id=$2;',[visits,linkId])
        res.redirect(200, UrlExist.rows[0].url)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteUrl(req,res){
    const { id } = req.params;
    const idUser = res.locals.user;

    try {
        const UrlExist = await connection.query('SELECT * FROM links WHERE links.id=$1;',[id]);
        if(!UrlExist.rows[0]){return res.sendStatus(404)};
        if(idUser != UrlExist.rows[0].userid){
            return res.sendStatus(401)
        }
        const deleteU = await connection.query('DELETE FROM links WHERE id=$1;',[id]);
        return res.status(204).send(UrlExist.rows[0])
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export {postURL, getUrl, redirect, deleteUrl}