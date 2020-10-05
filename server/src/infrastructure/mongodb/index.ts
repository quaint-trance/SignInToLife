import User from './models/User'
import Event from './models/Event'

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
        event: {
            find: async (filter: { id?: string }) => {
                
                const newFilter:any = {
                    ...filter
                };
                if(filter.id){
                    newFilter._id = newFilter.id;
                    delete newFilter.id;
                }
                
                const result = await Event.findOne({ ...newFilter });
                if( !result ) return false;
                else return {
                    ...result, 
                    id: result._id
                };
            },
            
            save: async (data: {line: number, busNumber: number, date:Date}) => {
                console.log(3123123);
                const event  = new Event({
                    ...data
                })
                const result = await event.save();
                console.log(result)
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
                
                const result = await Event.updateOne({...newFilter}, updateObject);
                return result.nModified;
            },
            findMultiple: async ()=>{
                const t =  await Event.find();
                console.log(t);
                return t;
            }
        }

        })
}