import express from 'express';
const router = express.Router();
import { mainF } from '../../index';

type reqType = express.Request & {user: string}; 

router.get('/getEvents', async (req:reqType, res: any)=>{
    console.log(3123)
    const result = await mainF.eventService.getAll();
    if( !result ) res.status(423).send();
    else res.status(200).send(result);
});

router.post('/addEvent', async (req:reqType, res: any)=>{
    //const user = await mainF.entities.user.find({id: req.user});
    //if( !user ) return res.status(400).send();
    const result = await mainF.eventService.createEvent(req.body.date, req.body.place, req.body.user, req.body.name);
    if( result ) res.status(200).send();
    else res.status(400).send();
});


export default router;