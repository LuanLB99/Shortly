import connection from "../connection.js";
import { nanoid } from 'nanoid';

async function postURL(req, res){
    const string = req.body;
    const shortURL = nanoid();
    try {
        const encurtUrl = await connection.query('INSERT INTO links (shortUrl, url) VALUES ($1,$2);',[shortURL, string])
        console.log(string)
        return res.send(shortURL);
    } catch (error) {
       return res.status(422).send("Invalid URL");
    }

    res.send('tudo ok!');
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


export {postURL, getUrl}