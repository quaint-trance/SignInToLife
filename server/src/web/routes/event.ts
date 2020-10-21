import express from 'express';
const router = express.Router();
import { mainF } from '../../index';

import eventValidation from './validation/addEvent';
import verifyUser from './middlewares/verifyUser';

type reqType = express.Request & {user: string}; 

router.get('/getEvents' ,async (req:reqType, res: any)=>{
    const result = await mainF.eventService.getAll();
    console.log(result)
    if( !result ) res.status(423).send();
    else res.status(200).send(result);
});

router.post('/addEvent', verifyUser, eventValidation, async (req:reqType, res: any)=>{
    const result = await mainF.eventService.createEvent(req.body.date, req.body.place, req.user, req.body.name, req.body.description);
    if( result ) res.status(200).send();
    else res.status(400).send();
});

router.post('/participate', verifyUser, async (req:reqType, res: any)=>{
    console.log('ee');
    const result = await mainF.eventService.participateInEvent(req.body.eventId, req.user);
    if( result ) res.status(200).send();
    else res.status(400).send();
});


export default router;