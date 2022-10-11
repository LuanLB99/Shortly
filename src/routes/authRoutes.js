import express from 'express';
import { getStatus, signIn, signUp } from '../controllers/authControllers.js';
import { validateLogin, validateRegister } from '../middleweres/authValidates.js';
const routes = express.Router();


routes.get('/status', getStatus)
routes.post('/signup', validateRegister, signUp)
routes.post('/signin', validateLogin, signIn)

export default routes;