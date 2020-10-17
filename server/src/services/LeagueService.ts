import { mainF } from '..';
import { LeagueT } from '../domain/entities/League/League'
import { UserT } from '../domain/entities/User/User'

interface entitiesT{
    league: LeagueT;
    user: UserT
}

export default class{

    entities: entitiesT;

    constructor(entities: entitiesT){
        this.entities = entities;
    }

    async addUserToLeague(id: string){
        const user = await this.entities.user.find({id});
        if( !user ) return false;

        console.log(user.name);

        const league = await this.entities.league.find({ level: user.level });
        if( !league ){
            const newLeague = await this.entities.league.create(user.level);
            if( !newLeague ) return false;
            newLeague.addParticipant( id );
            user.leagueId = newLeague.id;
            return true;
        }
        else{
            await league.addParticipant(id);
            user.setLeaugeId(league.id);
            return true;
        }
    }

    async getLeaderboardToUser(id: string){
        const user = await this.entities.user.find({id});
        if( !user ) return false;
        console.log(user.name);
        console.log(user.leagueId);

        if(user.leagueId === '' || !user.leagueId) return null;0

        const league = await this.entities.league.find({id: user.leagueId});
        if(!league) return false;
        console.log(league)

        const fullLeaderboard = await Promise.all(league.getLeaderboard().map(async (el)=> {
            const u = await this.entities.user.find({id: el.id});
            return {
                ...el,
                name: u?.name,
            }            
        }));
        
        return {
            level: league.level,
            leaderboard: fullLeaderboard
        };
    }

    async submitRaport(id: string, data: any[]){
        const user = await mainF.entities.user.find({id});
        if( !user ) return false;

        const league = await mainF.entities.league.find({ id: user.leagueId });
        if( !league ) return false;

        const score = this.calcScore(data);
        league.changeScore(id, score);
        user.addPoints(score);

        return true;
    }

    calcScore(data: any[]){
        return 10;
    }

}