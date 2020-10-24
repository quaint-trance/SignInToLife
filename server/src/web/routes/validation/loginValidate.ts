import express from 'express';
import Joi from 'joi';

const loginValidate = (req: any, res: express.Response, next: any) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const { error, value } = schema.validate(req.body);
    if(error){
        res.status(400).send();
    }
    else next();
}

export default loginValidate;