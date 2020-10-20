import { EventT } from '../domain/entities/Event/Event'

interface entitiesT{
    event: EventT;
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

}