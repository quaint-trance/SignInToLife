interface databaseT{
    user:{
        find: (filter: {email?: string, id?: string}) => any,
        save: (newUser: {streak: number, points: number ,email: string, name: string, password: string, level: number}) => any,   
        update: (filter: {email?: string, id?: string, name?: string}, prop: string, value: any) => any,   
    }
};

interface hashT{
    hash: (password: string) => string,
    compare: (password: string, hash: string) =>{},
}

export type UserT = ReturnType<typeof UserFactory>

const UserFactory = (databaseI: databaseT, hashI: hashT) =>{
    
    return class User{
        public id: string;
        public name: string;
        public email: string;
        public active: boolean;
        public password: string;
        public level: number;
        public leagueId: string | undefined;
        gainedScoreHistory:{
            score: number,
            date: string | Date;
        }[]
        streak: number;
        points: number;

        constructor(data:any){
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.password = data.password;
            this.active = data.active;
            this.level = data.level;
            this.leagueId = data.leagueId;
            this.gainedScoreHistory = data.gainedScoreHistory;
            this.points = data.points;
            this.streak = data.streak;
        }
        
        static async find(filter:{email?:string, id?:string}){
            const element = await databaseI.user.find( {...filter} );
            if(!element) return undefined;
            return new User(element);
        }
        
        static async create(name: string, email: string, password: string){
            const isAlready = await this.find({email});
            if( isAlready ) return false;
            
            const hashedPassword = await hashI.hash(password);

            const result = await databaseI.user.save({
                email,
                name,
                password: hashedPassword,
                level: 0,
                streak: 0,
                points: 0,
            });
            if( !result ) return false;
            return new User(result);
            
        }
        
        async update( prop: string, value: any  ){
            const result = await databaseI.user.update({ id: this.id }, prop, value);
            if(!result) return false;
            return true;
        }


        async isPasswordCorrect(password: string){
            return await hashI.compare(password, this.password);
        }

        getWeekScoreHistory(){
            const now = new Date();
            const t:any[] = [];
            this.gainedScoreHistory.forEach(element=>{
                element.date = new Date(element.date);
                const daysAgo = Math.floor(( now.getTime() - element.date.getTime()  )/( 1000*60*60*24 ));
                if(6-daysAgo < 0) return;
                t[ 6-daysAgo ] = element;
            })

            for(let i = 0; i < 7; i++){
                if( !t[i] ) t[i] = {
                    score: 0,
                    date: new Date()
                };
            }

            return t;
        }

        async setLeaugeId(id: string){
            this.leagueId = id;
            return await this.update('leagueId', id);
        }

        async verifyStreak(){
            console.log('ver streak');
            const y = new Date(Date.now() - (1000*60*60*24));
            const yesterday = this.gainedScoreHistory.find(el=>
                (new Date(el.date)).getFullYear() === y.getFullYear()
                && (new Date(el.date)).getDate() === y.getDate()
                && (new Date(el.date)).getMonth() === y.getMonth()
            )
            console.log(yesterday);
            if(yesterday) this.streak++;
            else this.streak = 0;
            await this.update('streak', this.streak);
        }

        async addPoints(points: number){
            const now = new Date();
            const f = this.gainedScoreHistory.find(el=>
                (new Date(el.date)).getFullYear() === now.getFullYear()
                && (new Date(el.date)).getDate() === now.getDate()
                && (new Date(el.date)).getMonth() === now.getMonth()
            )
            this.points+=points;
            if(f) {
                f.score+= points;
            }
            else{
                await this.verifyStreak();
                this.gainedScoreHistory.push({score: points, date: now});
            }
            this.update('gainedScoreHistory', this.gainedScoreHistory)
            this.update('points', this.points);
        }
        
    }
}
export default UserFactory;