import serverFactory from '../src/serverFactory';

export default (database: {user: any[], event: any[], league: any[]})=>{

    const databaseI = {
        user:{
            find: (filter: {email?: string, id?: string})=>{
                return database.user.find((element)=>{
                    if( filter.email && element.email === filter.email ) return true;
                    if( filter.id && element.id === filter.id ) return true;
                    return false;
                })
            },
            save: (object:{email: string, name: string, password: string})=>{
                const obj = {
                    ...object,
                    id: "0"+Math.random()*13,
                    active: true
                }
                database.user.push(obj);
                return obj;
            },
            update: (filter: {email?: string, id?: string}, prop: string, value:any)=>{
                const element = databaseI.user.find(filter);
                if(!element) return false;
                // @ts-ignore
                element[prop] = value;
                return true;
            },
        },
        event:{
            find: (filter: {id: string})=>{
                return database.event.find((element)=>{
                    if( filter.id && element.id === filter.id ) return true;
                    return false;
                })
            },
            save: (object:{ date: Date,place:{x:string, y:string}, creator:string, name:string})=>{
                const i =  "0"+Math.random()*13;
                const obj = {
                    ...object,
                    id: i,
                }
                database.event.push(obj);
                return obj;
            },
            update: (filter: { id: string}, prop: string, value:any)=>{
               
                const element = databaseI.event.find(filter);
                if(!element) return false;
                // @ts-ignore
                element[prop] = value;
                return true;
            },
            findMultiple: (filter:{id:string})=>{
                return database.event;
            }
        },
        league:{
            find: (filter: {id: string})=>{
                return database.league.find((element)=>{
                    if( filter.id && element.id === filter.id ) return true;
                    return false;
                })
            },
            save: (object:{ level: number, participations: any[] })=>{
                const i =  "0"+Math.random()*13;
                const obj = {
                    ...object,
                    id: i,
                }
                database.league.push(obj);
                return obj;
            },
            update: (filter: { id: string}, prop: string, value:any)=>{
               
                const element = databaseI.league.find(filter);
                if(!element) return false;
                // @ts-ignore
                element[prop] = value;
                return true;
            },
            findMultiple: (filter:{id:string})=>{
                return database.league;
            }
        }
}

const hashI = {
    hash: (password: string) => password+'e',
    compare: (password: string, hash: string) => {
        return hashI.hash(password) === hash;
    }
}

const emailI = {
    sendActivactionMail: ()=>{}
}

return serverFactory(databaseI, emailI, hashI);
}