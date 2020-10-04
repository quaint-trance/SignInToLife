import express from 'express'
const router = express.Router();
import jwt from 'jsonwebtoken'
import { mainF } from '../../index'

router.post('/', async (req, res)=>{
    try{
        if(!process.env.TOKEN_K) throw new Error('no varibles!');
        const { id } = <{id: string}>jwt.verify( req.body?.token, process.env.TOKEN_K+"activation" );
        console.log(id);
        const result = await mainF.userService.activateAccount(id);
        console.log(result)
        if(result === false) res.status(400).send();
        else res.status(200).send();
    } catch(error){
        res.status(400).send();
    }
});

export default router;