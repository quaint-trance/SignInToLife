import { string } from 'joi';
import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document{
    id: string;
    date: Date;
    place: {x: string, y: string};
    name: string;
    creator: string;
    description: string;
    activity: {userId: string, data: string, date: string}[];
    photos: string[];
}

const eventSchema = new mongoose.Schema({
    id: String,
    date: Date,
    place: {x: String, y: String},
    name: String,
    creator: String,
    description: String,
    activity: [{
        userId: String,
        data: String,
        date: Date,
    }],
    photos:[String]
});

export default mongoose.model<IEvent>('Event', eventSchema);