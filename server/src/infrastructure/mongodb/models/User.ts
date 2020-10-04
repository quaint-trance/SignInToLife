import mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    active: string,
    rides: string,
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
    rides: [{
        type: String,
    }]
});

export default mongoose.model<IUser>('User', userSchema);