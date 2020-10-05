interface databaseT{
    event: {
        find: (filter: { id: string }) => any,
        findMultiple: (filter: { id?: string }) => any[],
        save: ({}:{date: Date, place: {x: string, y: string}, creator: string, name: string}) => any,   
        update: (filter: { id: string }, prop: string, value: any) => any,
    }
};

const EventFactory = (databaseI: databaseT) =>{
    
    return class Event{
        id: string;
        date: Date;
        place: {x: string, y: string};
        name: string;
        creator: string;

        constructor(data: {id: string, date:Date, place: {x: string, y:string}, creator: string, name: string } ){
            this.id = data.id;
            this.date = data.date;
            this.place = data.place;
            this.name = data.name;
            this.creator = data.creator;
        }
        
        static async find(filter:{ id:string }){
            const element = await databaseI.event.find( {...filter} );
            if(!element) return undefined;
            return new Event(element);
        }
        
        static async create(date: Date, place: {x: string, y: string}, creator: string, name: string){
            const result = await databaseI.event.save({
                date,
                place,
                creator,
                name
            });
            if( !result ) return false;
            return new Event(result);
        }
        
        async update( prop: string, value: any  ){
            const result = await databaseI.event.update({ id: this.id }, prop, value);
            if(!result) return false;
            return true;
        }

        static async getAll(){
            const element = await databaseI.event.findMultiple( {} );
            if(!element) return undefined;
            const changed = element.map(el=> new Event(el));
            return changed;
        }
        
    }
}
export default EventFactory;
export type EventT = ReturnType<typeof EventFactory>