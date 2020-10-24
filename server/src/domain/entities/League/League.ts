interface databaseT{
    league: {
        find: (filter: { id?: string, level?: number }) => any,
        findMultiple: (filter: { id?: string }) => any[],
        save: ({}:{ level: number, participators: any[], ends: string, ended: boolean }) => any,   
        update: (filter: { id: string }, prop: string, value: any) => any,
        pushP: (id: string, value: any) => any;
    }
};

const getDateOfNextSunday = () =>{
    const n = new Date();
    const daysToSunday = 7 - n.getDay();
    const sunday = new Date(n);
    sunday.setHours(23);
    sunday.setMinutes(59);
    sunday.setSeconds(59);
    sunday.setDate(n.getDate() + daysToSunday);
    return sunday;
}

const LeagueFactory = (databaseI: databaseT) =>{
    
    return class League{
        id: string;
        participators: {id: string, score: number }[];
        level: number;
        ends: string;
        ended: boolean;


        constructor(data: { ended: boolean, id: string, participators: any[], level: number, ends: string }){
            this.id = data.id;
            this.participators =  data.participators ? data.participators : [] ;
            this.level = data.level;
            this.ends = data.ends;
            this.ended = data.ended;
        }
        
        static async find(filter:{ id?:string, level?:number }){
            const element = await databaseI.league.find( {...filter} );
            if(!element) return undefined;
            return new League(element);
        }
        
        static async create(level: number){
            const result = await databaseI.league.save({
                participators: [],
                level,
                ends: getDateOfNextSunday().toString(),
                ended: false
            });
            if( !result ) return false;
            return new League(result);
        }
        
        
        static async getAll(){
            const element = await databaseI.league.findMultiple( {} );
            if(!element) return undefined;
            const changed = element.map(el=> new League(el));
            return changed;
        }
        
        async update( prop: string, value: any  ){
            const result = await databaseI.league.update({ id: this.id }, prop, value);
            if(!result) return false;
            return true;
        }

        async addParticipant(id: string){
            this.participators.push({id, score: 0});
            await databaseI.league.pushP(this.id, {id, score: 0}); 
            return true;
        }

        async changeScore(id: string, delta: number){
            const par = this.participators.find(p => p.id === id);
            if( !par ) return false;
            par.score += delta;
            console.log(delta);
            return await this.update('participators', this.participators)
        }

        async verifyEnds(){
            const n = new Date();
            console.log('ver');
            if( n.getTime() > (new Date(this.ends)).getTime() ){
                this.ended = true;
                await this.update('ended', this.ended);
                return true;
            }
            console.log('jest git', n,  new Date(this.ends) );
            return false;
        }

        getLeaderboard(){
            return this.participators.sort((a, b)=> b.score - a.score);
        }

    }
}
export default LeagueFactory;
export type LeagueT = ReturnType<typeof LeagueFactory>