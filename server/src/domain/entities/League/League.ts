interface databaseT{
    league: {
        find: (filter: { id?: string, level?: number }) => any,
        findMultiple: (filter: { id?: string }) => any[],
        save: ({}:{ level: number, participators: any[] }) => any,   
        update: (filter: { id: string }, prop: string, value: any) => any,
        pushP: (id: string, value: any) => any;
    }
};

const LeagueFactory = (databaseI: databaseT) =>{
    
    return class League{
        id: string;
        participators: {id: string, score: number }[];
        level: number;


        constructor(data: { id: string, participators: any[], level: number }){
            this.id = data.id;
            this.participators =  data.participators ? data.participators : [] ;
            this.level = data.level;
        }
        
        static async find(filter:{ id?:string, level?:number }){
            const element = await databaseI.league.find( {...filter} );
            console.log(element);
            if(!element) return undefined;
            return new League(element);
        }
        
        static async create(level: number){
            const result = await databaseI.league.save({
                participators: [],
                level
            });
            console.log(result);
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
            console.log(this.participators);
            return await databaseI.league.pushP(this.id, {id, score: 0}); 
        }

        async changeScore(id: string, delta: number){
            const par = this.participators.find(p => p.id === id);
            if( !par ) return false;
            par.score += delta;
        }

        getLeaderboard(){
            return this.participators.sort((a, b)=> b.score - a.score);
        }

    }
}
export default LeagueFactory;
export type LeagueT = ReturnType<typeof LeagueFactory>