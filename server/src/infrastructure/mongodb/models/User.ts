import { string } from 'joi';
import mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    active: string,
    level: number;
    leagueId: string | undefined;
    gainedScoreHistory:{
        score: number,
        date: Date;
    }[];
    streak: number;
    points: number;
}

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: false
    },
    leagueId: {
        type: String,
        default: ''
    },
    level: Number,
    gainedScoreHistory:[{
        score: Number,
        date: Date
    }],
    streak: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    }

});

export default mongoose.model<IUser>('User', userSchema);