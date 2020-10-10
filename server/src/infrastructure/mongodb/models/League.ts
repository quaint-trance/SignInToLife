import mongoose from 'mongoose';

export interface ILeague extends mongoose.Document{
    participators: {id: string, score: number }[];
    level: number;
}

const eventSchema = new mongoose.Schema({
    level: Number,
    participators: [{
        id: String,
        score: Number
    }]
});

export default mongoose.model<ILeague>('League', eventSchema);