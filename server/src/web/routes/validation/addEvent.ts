import jwt from 'jsonwebtoken';
import express from 'express';
import Joi from 'joi';
import { userInfo } from 'os';

const eventValidate = (req: any, res: express.Response, next: any) =>{


    const schema = Joi.object({
        place: {
            x: Joi.string().required(),
            y: Joi.string().required()
        },
        name: Joi.string().required()
    })

    const { error, value } = schema.validate(req.body);

    if(error){
        res.status(400).send();
    }
    else next();
}

export default eventValidate;