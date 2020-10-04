import express from 'express';
import User from '../../domain/types/User';
const router = express.Router();
import { mainF } from '../../index';

type reqType = express.Request & {user: string}; 

router.post('/getRides', async (req:reqType, res: any)=>{
    const result = await mainF.userService.getUser(req.user);
    if(result === false) res.status(423).send();
    else res.status(200).send(result);
});

router.post('/addRides', async (req:reqType, res: any)=>{
    const user = await mainF.entities.user.find({id: req.user});
    if( !user ) return res.status(400).send();
    const result = await mainF.rideService.createRide(req.user, req.body?.line, req.body?.busNumber, req.body?.date);
    if( result ) res.status(200).send();
    else res.status(400).send();
});


export default router;