import jwt from 'jsonwebtoken'
import UserFactory from '../domain/entities/User/User'
import RideFactory from '../domain/entities/Ride/Ride'

// @ts-ignore
const UserClass = UserFactory();
// @ts-ignore
const RideClass = RideFactory();

interface entitiesT{
    user: typeof UserClass;
    ride: typeof RideClass
}

export default class{

    emailDriver: any;
    entities: entitiesT;

    constructor(entities: entitiesT, emailDriver: any){
        this.emailDriver = emailDriver;
        this.entities = entities;
    }

    async login(email: string, password: string){
        const user = await this.entities.user.find({email});
        console.log(email)
        if( !user ){
            console.log('no such a user')
            return false;
        } 
        if( !(await user.isPasswordCorrect(password))  ){
            console.log('bad pass')
            return false;
        }
        if( !user.active ) {
            console.log('inactive account');
            return false;
        }
        
        const token = jwt.sign( {id: user.id}, "secret" );
        return token;
    }
    
    async register(name: string, email: string, password: string){
        const isAlready = await this.entities.user.find({email});
        if( isAlready ) return false;
        
        const result = await this.entities.user.create(
            name,
            email,
            password
            );
        
        if( !result ) return false;
        this.emailDriver.sendActivactionMail(result.id, email);
        return true;
        
    }
    
    async activateAccount(id: string){
        const user = await this.entities.user.find( { id });
        const result = await user?.update('active', true);
        if(!result) return false;
        return true;
    }

    async getUser(id: string){
        const user =  await this.entities.user.find({id});
        if(!user) return false;

        const rideObj = new RideClass({ id: "", line: 0, busNumber: 0, date: new Date() });
        const rides:typeof rideObj[] = [];
        
        for(let r in (user.rides)){
            const resolvedR = await this.entities.ride.find({id: (user.rides[r])});
            if( !resolvedR ) continue;
            rides.push(resolvedR);
        }

        return {
            ...user,
            rides: rides
        }
        
    }

}