import express from 'express';
import { getUrl, postURL } from '../controllers/urlControllers.js';
import { authMiddleware } from '../middleweres/authValidates.js';
const routes = express.Router();


routes.post('/urls/shorten',authMiddleware, postURL)
routes.get('/urls/:id',getUrl)

export default routes;