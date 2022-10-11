import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const connection = new Pool({
    user:'postgres',
    password:'benilda12',
    host:'localhost',
    port:5432,
    database:'postgres'
})

export default connection;