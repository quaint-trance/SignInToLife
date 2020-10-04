import bcrypt from 'bcryptjs';

export default ()=>{
    return{
        hash: async (password: string)=>{
            return await bcrypt.hash(password, await bcrypt.genSalt(10));
        },
        compare: async (password:string, hash:string)=>{
            return await bcrypt.compare(password, hash);
        }
    }
}