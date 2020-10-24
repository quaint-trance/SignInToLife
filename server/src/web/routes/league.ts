import express from 'express';
const router = express.Router();
import { mainF } from '../../index';

import verifyUser from './middlewares/verifyUser';

type reqType = express.Request & {user: string}; 

router.get('/getLeaderboard', verifyUser , async (req:reqType, res: any)=>{
    const result = await mainF.leagueService.getLeaderboardToUser(req.user);
    if( result === false ) res.status(423).send();
    else if( result === null ) res.status(204).send();
    else res.status(200).send(result);
});

/*router.get('/addUsertoLeague', verifyUser , async (req:reqType, res: any)=>{
    const result = await mainF.leagueService.addUserToLeague(req.user);
    if( !result ) res.status(423).send();
    else res.status(200).send(result);
});*/


router.post('/submitRaport', verifyUser , async (req:reqType, res: any)=>{
    console.log('eeeee');
    const result = await mainF.leagueService.submitRaport(req.user, req.body.data)
    if( !result ) res.status(400).send();
    else res.status(200).send();
});

export default router;