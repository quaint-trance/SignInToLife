import RideFactory from '../domain/entities/Ride/Ride'
import UserFactory from '../domain/entities/User/User'

// @ts-ignore
const RideClass = RideFactory();
// @ts-ignore
const UserClass = UserFactory();

interface entitiesT{
    ride: typeof RideClass;
    user: typeof UserClass;
}

export default class{

    entities: entitiesT;

    constructor(entities: entitiesT){
        this.entities = entities;
    }

    async createRide(userId: string, line:number, busNumber: number, date: Date){
        const user = await this.entities.user.find({id: userId});
        if( !user ) return false;
        
        const ride = await this.entities.ride.create(line, busNumber, date);
        if( !ride ) return false;
        
        return await user.linkRide(ride.id);
    }

}