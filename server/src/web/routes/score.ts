import express from 'express';
const router = express.Router();
import { mainF } from '../../index';

import verifyUser from './middlewares/verifyUser';

type reqType = express.Request & {user: string}; 

router.get('/getScore', verifyUser ,async (req:reqType, res: any)=>{
    console.log(312);
    const result = await mainF.userService.getScore(req.user);
    console.log(result);
    if( !result ) res.status(423).send();
    else res.status(200).send(result);
});

export default router;