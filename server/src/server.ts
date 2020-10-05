import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './web/routes/auth'
import eventRoute from './web/routes/event'
import activationRoute from './web/routes/activation'

export default ()=>{

    const app = express();
    const server = app.listen(process.env.PORT || 4000, ()=>{
        console.log('server up')
    });

    app.use(express.json());
    app.use(cors());

    app.use('/auth', authRoute);
    app.use('/activation', activationRoute);
    app.use('/events', eventRoute);


    if(!process.env.DB_ACCESS) throw new Error('lack of env variables');
    mongoose.connect(process.env.DB_ACCESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, ()=>{
        console.log('yey'); 
    });

    return server;
}