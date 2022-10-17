import connection from '../connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function getStatus (req,res){
    const customers = await connection.query('SELECT * FROM customers;')
    res.send(customers);
}

async function signUp(req,res){
   const {name, email, password} = res.locals.user;
   try {
    const userExist = await connection.query('SELECT * FROM users WHERE email=$1',[email])
    if(userExist.rows.length != 0){return res.sendStatus(409)}

   const hashPassword = bcrypt.hashSync(password,12);
    const myUser = await connection.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3);',[name, email,hashPassword]);
   return res.sendStatus(201);
   } catch (error) {
    return res.status(500).send(error.message)
   }
   
}

async function signIn(req, res){
    const {email, password} = res.locals.user;
    try {
        const userExist = await connection.query('SELECT * FROM users WHERE email=$1',[email])
    if(userExist.rows.length === 0){return res.sendStatus(401)}
    if(!bcrypt.compareSync(password,userExist.rows[0].password)){
        return res.sendStatus(401);
    }
    const token = {token:uuid()};
    const session = await connection.query('INSERT INTO sessions (userId, token) VALUES ($1,$2);',[userExist.rows[0].id,token.token])

    return res.status(200).send(token);
        
    } catch (error) {
        return res.status(422).send(error.message); 
    }
    
}


export { getStatus, signUp, signIn }
