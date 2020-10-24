import express from 'express';
const router = express.Router();
import { mainF } from '../../index';
import loginValidate from './validation/loginValidate'
import registerValidate from './validation/registerValidate'

router.post('/register', registerValidate ,async (req, res)=>{
    const result = await mainF.userService.register(req.body?.name ,req.body?.email, req.body?.password);
    if(result === false) res.status(423).send();
    else res.status(200).send();
});

router.post('/login', loginValidate,async (req, res)=>{
    const result = await mainF.userService.login(req.body?.email, req.body?.password);
    if(result === false) res.status(400).send();
    else res.status(200).send({result});
});

export default router;