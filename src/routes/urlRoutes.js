import express from 'express';
import { postURL } from '../controllers/urlControllers.js';
import { authMiddleware } from '../middleweres/authValidates.js';
const routes = express.Router();


routes.post('/urls/shorten',authMiddleware, postURL)


export default routes;