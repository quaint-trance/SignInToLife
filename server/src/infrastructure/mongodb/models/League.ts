import mongoose from 'mongoose';

export interface ILeague extends mongoose.Document{
    participators: {id: string, score: number }[];
    level: number;
    ends: string;
    ended: boolean;
}

const eventSchema = new mongoose.Schema({
    level: Number,
    participators: [{
        id: String,
        score: Number
    }],
    ends: String,
    ended: Boolean
});

export default mongoose.model<ILeague>('League', eventSchema);