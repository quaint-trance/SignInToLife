import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document{
    id: string;
    date: Date;
    place: {x: string, y: string};
    name: string;
    creator: string;
}

const eventSchema = new mongoose.Schema({
    id: String,
    date: Date,
    place: {x: String, y: String},
    name: String,
    creator: String,
});

export default mongoose.model<IEvent>('Event', eventSchema);