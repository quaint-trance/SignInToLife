interface databaseT{
    ride: {
        find: (filter: { id: string }) => any,
        save: (newUser: {line: number, busNumber: number, date:Date}) => any,   
        update: (filter: { id: string }, prop: string, value: any) => any,
    }
};

const RideFactory = (databaseI: databaseT) =>{
    
    return class Ride{
        id: string;
        line: number;
        busNumber: number;
        date: Date;

        constructor(data: {id: string, line: number, busNumber: number, date:Date } ){
            this.id = data.id;
            this.line = data.line;
            this.busNumber = data.busNumber;
            this.date = data.date;
        }
        
        static async find(filter:{ id:string }){
            const element = await databaseI.ride.find( {...filter} );
            if(!element) return undefined;
            return new Ride(element);
        }
        
        static async create(line: number, busNumber: number, date:Date){
            const result = await databaseI.ride.save({
                line,
                busNumber,
                date
            });
            if( !result ) return false;
            return new Ride(result);
        }
        
        async update( prop: string, value: any  ){
            const result = await databaseI.ride.update({ id: this.id }, prop, value);
            if(!result) return false;
            return true;
        }
        
    }
}
export default RideFactory;