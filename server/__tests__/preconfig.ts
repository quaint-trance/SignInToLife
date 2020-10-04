import serverFactory from '../src/serverFactory';

export default (database: {user: any[], ride: any[]})=>{

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
        ride:{
            find: (filter: {id: string})=>{
                return database.ride.find((element)=>{
                    if( filter.id && element.id === filter.id ) return true;
                    return false;
                })
            },
            save: (object:{line: number, busNumber: number, date:Date})=>{
                const i =  "0"+Math.random()*13;
                const obj = {
                    ...object,
                    id: i,
                }
                database.ride.push(obj);
                return obj;
            },
            update: (filter: { id: string}, prop: string, value:any)=>{
               
                const element = databaseI.ride.find(filter);
                if(!element) return false;
                // @ts-ignore
                element[prop] = value;
                return true;
            },
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