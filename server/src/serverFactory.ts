import User from "./domain/entities/User/User"
import UserService from "./services/UserService"
import Event from './domain/entities/Event/Event'
import EventService from './services/EventService'

export default (databaseI:any, emailI: any, hashI:any)=>{
    
    const entities = {
        user: User(databaseI, hashI),
        event: Event(databaseI),
    }

    return{
        userService: new UserService(entities, emailI),
        eventService: new EventService(entities),
        entities,
    }
}