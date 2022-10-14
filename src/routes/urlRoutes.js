import express from 'express';
import { deleteUrl, getUrl, postURL, redirect } from '../controllers/urlControllers.js';
import { authMiddleware } from '../middleweres/authValidates.js';
const routes = express.Router();


routes.post('/urls/shorten',authMiddleware, postURL)
routes.get('/urls/:id',getUrl)
routes.get('/urls/open/:shortUrl', redirect)
routes.delete('/urls/:id',authMiddleware, deleteUrl)

export default routes;