import User from "./domain/entities/User/User"
import UserService from "./services/UserService"
import Ride from './domain/entities/Ride/Ride'
import RideServise from './services/RideService'

export default (databaseI:any, emailI: any, hashI:any)=>{
    
    const entities = {
        user: User(databaseI, hashI),
        ride: Ride(databaseI),
    }

    return{
        userService: new UserService(entities, emailI),
        rideService: new RideServise(entities),
        entities,
    }
}