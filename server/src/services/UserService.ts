import jwt from 'jsonwebtoken'
import { UserT } from '../domain/entities/User/User'

interface entitiesT{
    user: UserT;
}

export default class{

    emailDriver: any;
    entities: entitiesT;

    constructor(entities: entitiesT, emailDriver: any){
        this.emailDriver = emailDriver;
        this.entities = entities;
    }

    async login(email: string, password: string){
        const user = await this.entities.user.find({email});
        if( !user ){
            //console.log('no such a user')
            return false;
        } 
        if( !(await user.isPasswordCorrect(password))  ){
            //console.log('bad pass')
            return false;
        }
        if( !user.active ) {
            //console.log('inactive account');
            return false;
        }
        
        const token = jwt.sign( {id: user.id}, "secret" );
        return token;
    }
    
    async register(name: string, email: string, password: string){
        const isAlready = await this.entities.user.find({email});
        if( isAlready ) return false;
        
        const result = await this.entities.user.create(
            name,
            email,
            password
            );
        
        if( !result ) return false;
        this.emailDriver.sendActivactionMail(result.id, email);
        return true;
        
    }
    
    async activateAccount(id: string){
        const user = await this.entities.user.find( { id });
        const result = await user?.update('active', true);
        if(!result) return false;
        return true;
    }

    async getUser(id: string){
        const user =  await this.entities.user.find({id});
        if(!user) return false;

        return {
            ...user,
        }
        
    }

}