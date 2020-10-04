import express from 'express';
const router = express.Router();
import { mainF } from '../../index';

router.post('/register', async (req, res)=>{
    const result = await mainF.userService.register(req.body?.name ,req.body?.email, req.body?.password);
    if(result === false) res.status(423).send();
    else res.status(200).send();
});

router.post('/login', async (req, res)=>{
    const result = await mainF.userService.login(req.body?.email, req.body?.password);
    if(result === false) res.status(400).send();
    else res.status(200).send({result});
});

export default router;