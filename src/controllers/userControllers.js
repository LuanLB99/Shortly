import connection from "../connection.js";

async function getMyLinks(req,res){
    const id = res.locals.user;
    try {
        const MyUrls = await connection.query('SELECT u.name as "name", u.id as "userid", SUM(links.visits) as "visitCount", l.visits, l.url, l.shorturl FROM users u JOIN links ON u.id=links."userid" JOIN links l ON l."userid"=u.id WHERE u.id=$1 GROUP BY u.id, l.visits, l.url, l.shorturl;',[id]);
        const shortened = await connection.query('SELECT * FROM links WHERE userid=$1;',[id])
        const result ={
            id:MyUrls.rows[0].userid,
            name:MyUrls.rows[0].name,
            visitCount:MyUrls.rows[0].visitCount,
            shortenedUrls:[shortened.rows]
        }
        console.log(result)
        return res.status(201).send(result)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    res.sendStatus(201);
}

async function getRanking(req, res){
    try {
        const ranking = await connection.query('SELECT u.id, u.name, COUNT(l.*) as "linksCount", SUM(l.visits) as "visitCount" FROM links l JOIN users u ON l.userid=u.id GROUP BY u.name, u.id ORDER BY "visitCount" DESC;');
        return res.send(ranking.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export { getMyLinks, getRanking }