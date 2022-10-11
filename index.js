import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './src/routes/authRoutes.js';
import urlRoutes from './src/routes/urlRoutes.js';


const server = express();
server.use(express());
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(AuthRoutes);
server.use(urlRoutes);

server.listen(process.env.PORT, () => console.log('the magic happens on port ' + process.env.PORT))
