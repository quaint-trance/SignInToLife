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

        const league = await this.entities.league.find({ level: user.level });
        const toEnd = await league?.verifyEnds();
        if( !league || toEnd){
            const newLeague = await this.entities.league.create(user.level);
            if( !newLeague ) return false;
            newLeague.addParticipant( id );
            user.setLeaugeId(newLeague.id);
            return true;
        }
        else{
            await league.addParticipant(id);
            await user.setLeaugeId(league.id);
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
            ends: league.ends,
            leaderboard: fullLeaderboard
        };
    }

    async submitRaport(id: string, data: any[]){
        const user = await mainF.entities.user.find({id});
        if( !user ) return false;

        const score = this.calcScore(data);
        user.addPoints(score);

        let league = await mainF.entities.league.find({ id: user.leagueId });
        const toEnd = await league?.verifyEnds();
        console.log('e', toEnd)
        if( !league|| toEnd ) {
            await this.addUserToLeague(id);
            league = await mainF.entities.league.find({ id: user.leagueId });
            if(!league) return false;
        };
        league.changeScore(id, score);

        return true;
    }

    calcScore(data: any[]){
        let sum = 0;
        const w = [
            [1, -1, -2],
            [1, -1, -2],
            [1, -1, -2],
            [-1, 1, 2],
            [1, -1, -2, 2, 0],
            [2, -2]
        ];

        data.forEach((ans, index)=>{
            if(w[index] && w[index][ans])
                sum+= w[index][ans];
        });

        sum=Math.floor((sum+11)*1.5);
        sum+= 10;

        return sum;
    }

}