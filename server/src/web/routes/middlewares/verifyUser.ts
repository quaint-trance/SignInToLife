import jwt from 'jsonwebtoken';
import express from 'express';

const auth = (req: any, res: express.Response, next: any) =>{
    const token = req.header('auth-token');
    console.log(token)
    if(!token) return res.status(403).send('No token');
    try{
        if(!process.env.TOKEN_K) throw new Error('no varibles!');
        const verified = <{id: string}>jwt.verify(token, process.env.TOKEN_K);
        req.user = verified.id;
        return next();
    }catch(error){
        return res.status(403).send('Invalid Token');
    }
}

export default auth;