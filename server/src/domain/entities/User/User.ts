interface databaseT{
    user:{
        find: (filter: {email?: string, id?: string}) => any,
        save: (newUser: {email: string, name: string, password: string}) => any,   
        update: (filter: {email?: string, id?: string, name?: string}, prop: string, value: any) => any,   
    }
};

interface hashT{
    hash: (password: string) => string,
    compare: (password: string, hash: string) =>{},
}

const UserFactory = (databaseI: databaseT, hashI: hashT) =>{
    
    return class User{
        public id: string;
        public name: string;
        public email: string;
        public active: boolean;
        public password: string;
        public rides: string[];

        constructor(data:any){
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.password = data.password;
            this.active = data.active;
            this.rides = data.rides;
        }
        
        static async find(filter:{email?:string, id?:string}){
            const element = await databaseI.user.find( {...filter} );
            console.log(element);
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
            console.log("e", password, this.password)
            return await hashI.compare(password, this.password);
        }

        async linkRide(rideId: string){
            await this.update( 'rides', [...(this.rides), rideId] );
            return true;
        }
        
    }
}
export default UserFactory;