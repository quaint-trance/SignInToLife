import { EventT } from '../domain/entities/Event/Event'
import { UserT } from '../domain/entities/User/User'
import { LeagueT } from '../domain/entities/League/League'

interface entitiesT{
    event: EventT;
    user: UserT;
    league: LeagueT;
}

export default class{

    entities: entitiesT;

    constructor(entities: entitiesT){
        this.entities = entities;
    }

    async createEvent(date: Date, place:{x:string, y:string}, creatorId: string, name: string, description: string){
        const event = await this.entities.event.create(date, place, creatorId, name, description);
        if( !event ) return false;
        return true;
    }

    async getAll(){
        return await this.entities.event.getAll()
    }

    async participateInEvent(eventId: string, userId: string){
        const event = await this.entities.event.find({id: eventId});
        const user = await this.entities.user.find({id: userId})
        if(!event || !user) return false;

        event.makeActivity(userId, "took part in");
        user.addPoints(30);

        const leauge = await this.entities.league.find({id: user.leagueId});
        if(!leauge) return true;
        leauge.changeScore(userId, 30);
        return true;
    }

    async getEventActivity(id: string){
        const event = await this.entities.event.find({id});
        if(!event) return false;
        console.log(event);
        if(!event.activity) return [];
        const fullActivity = Promise.all(event.activity.map(async(el)=>{
            const user = await this.entities.user.find({id: el.userId});
            if(!user) return null;
            return {
                ...el,
                user: {
                    name: user.name,
                    level: user.level
                }
            }
        }));
        return fullActivity;
    }

}