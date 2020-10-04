import mongoose from 'mongoose';

export interface IRide extends mongoose.Document{
    id: string;
    line: number;
    busNumber: number;
    date: Date;
}

const userSchema = new mongoose.Schema({
    line:{
        type: Number,
        required: true
    },
    busNumber: {
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model<IRide>('Ride', userSchema);