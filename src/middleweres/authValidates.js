import connection from "../connection.js";
import { loginSchema, registrationSchema } from "../schemas/authSchema.js";


async function validateRegister(req, res, next){
    const {name, email, password, confirmPassword } = req.body;
    const validation = registrationSchema.validate({name, email, password, confirmPassword });
    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)}
    res.locals.user = {
        name, email, password, confirmPassword 
    }

    next();
}

async function validateLogin(req, res, next){
    const {email, password} = req.body;
    const validation = loginSchema.validate({email, password});
    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)}
    res.locals.user = {
        email, password 
    }

    next();
}

async function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.sendStatus(401);
    }

    const session = await connection.query('SELECT * FROM sessions WHERE token=$1;',[token])

    if(!session.rows[0]){return res.sendStatus(401)}
    res.locals.user = session.rows[0].userid;
    next();
}

export { validateRegister, validateLogin, authMiddleware }