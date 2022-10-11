import joi from "joi";

const registrationSchema = joi.object({
    name:joi.string().required().empty('').min(3),
    email:joi.string().email().required().empty(''),
    password:joi.string().required().empty(''),
    confirmPassword:joi.ref('password')
})

const loginSchema = joi.object({
    email:joi.string().email().required().empty('').min(3),
    password:joi.string().required().empty('').min(3)
})

//const urlSchema = joi.object({
 //   url:joi.string().required().regex()
//})

export { registrationSchema, loginSchema }