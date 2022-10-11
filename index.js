import express from 'express';
import dotenv from 'dotenv';
import connection from './src/connection.js';

const server = express();
server.use(express());
dotenv.config();

server.get('/status', async (req,res) =>{
        const customers = await connection.query('SELECT * FROM customers;')
    res.send(customers);
})

server.listen(process.env.PORT, () => console.log('the magic happens on port ' + process.env.PORT))
