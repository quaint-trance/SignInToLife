import User from './models/User'
import Ride from './models/Ride'

export default ()=>{
    return({
        user: {
            find: async (filter: {email?: string, id?: string, name?: string}) => {
                const newFilter:any = {
                    ...filter
                };
                if(filter.id){
                    newFilter._id = newFilter.id;
                    delete newFilter.id;
                }
                const result = await User.findOne({ ...newFilter });
                console.log(result)
                const result2 = JSON.parse(JSON.stringify(result));
                if( !result ) return false;
                else return {
                    ...result2,
                    id: result._id
                };
            },
            
            save: async (data: {email: string, name: string, password: string}) => {
                const user  = new User({
                    ...data
                })
                const result = await user.save();
                if( !result ) return false;
                else return {
                    ...result, 
                    id: result._id
                };
            },
            
            update: async (filter: {email?: string, id?: string, name?: string}, prop: string, value: any) => {
                const newFilter:any = {
                    ...filter
                };
                if(filter.id){
                    newFilter._id = newFilter.id;
                    delete newFilter.id;
                }
                
                const updateObject:any = {};
                updateObject[prop] = value;
                
                const result = await User.updateOne({...newFilter}, updateObject);
                return result.nModified;
            },
        },
        ride: {
            find: async (filter: { id?: string }) => {
                
                const newFilter:any = {
                    ...filter
                };
                if(filter.id){
                    newFilter._id = newFilter.id;
                    delete newFilter.id;
                }
                
                const result = await Ride.findOne({ ...newFilter });
                if( !result ) return false;
                else return {
                    ...result, 
                    id: result._id
                };
            },
            
            save: async (data: {line: number, busNumber: number, date:Date}) => {
                const ride  = new Ride({
                    ...data
                })
                const result = await ride.save();
                if( !result ) return false;
                else return {
                    ...result, 
                    id: result._id
                };
            },
            
            update: async (filter: { id: string }, prop: string, value: any) => {
                const newFilter:any = {
                    ...filter
                };
                if(filter.id){
                    newFilter._id = newFilter.id;
                    delete newFilter.id;
                }
                
                const updateObject:any = {};
                updateObject[prop] = value;
                
                const result = await Ride.updateOne({...newFilter}, updateObject);
                return result.nModified;
            },
        }

        })
}