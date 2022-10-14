import express from 'express';
import { getMyLinks, getRanking } from '../controllers/userControllers.js';
import { authMiddleware } from '../middleweres/authValidates.js';

const routes = express.Router();

routes.get('/users/me', authMiddleware, getMyLinks)
routes.get('/ranking', getRanking)

export default routes;