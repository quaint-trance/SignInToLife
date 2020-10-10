import User from "./domain/entities/User/User"
import UserService from "./services/UserService"
import Event from './domain/entities/Event/Event'
import EventService from './services/EventService'
import League from './domain/entities/League/League'
import LeagueService from "./services/LeagueService"

export default (databaseI:{user: any, event: any, league: any}, emailI: any, hashI:any)=>{
    
    const entities = {
        user: User(databaseI, hashI),
        event: Event(databaseI),
        league: League(databaseI)
    }

    return{
        userService: new UserService(entities, emailI),
        eventService: new EventService(entities),
        leagueService: new LeagueService(entities),
        entities,
    }
}