import express from 'express';
const router = express.Router();
import { mainF } from '../../index';

import verifyUser from './middlewares/verifyUser';

type reqType = express.Request & {user: string}; 

router.get('/getLeaderboard', verifyUser , async (req:reqType, res: any)=>{
    const result = await mainF.leagueService.getLeaderboardToUser(req.user);
    console.log(result);
    if( !result ) res.status(423).send();
    else res.status(200).send(result);
});

router.get('/addUserToLeaderBoard', verifyUser , async (req:reqType, res: any)=>{
    const result = await mainF.leagueService.addUserToLeague(req.user);
    console.log(result);
    if( !result ) res.status(423).send();
    else res.status(200).send(result);
});

export default router;