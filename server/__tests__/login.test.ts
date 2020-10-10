import jwt from "jsonwebtoken"
// @ts-ignore
import TestFactory from './preconfig'


const database = {

    user: [{
        id: "1",
        name: "User",
        email: "user@example.com",
        password: "pass123e",
        active: true
    }],
    event: [],
    league: []
}

const testFactory = TestFactory(database);
process.env.TOKEN_K = 'e'
describe('Login', ()=>{
    
    it('correctly', async (done)=>{
        const result = await testFactory.userService.login("user@example.com", "pass123");
        
        expect( result ).not.toBe( false );
        if( result === false ) return done();
        
        const payload = <{id:string, name: string}>jwt.decode(result);
        expect( typeof payload.id ).toBe( "string" );
        done();
    });

    it('incorrect password', async (done)=>{
        const result = await testFactory.userService.login("user@user.com", "password");
        expect( result ).toBe( false );
        done();
    });

    it('incorrect email', async (done)=>{
        const result = await testFactory.userService.login("us3r@user.com", "passw0rd");
        expect( result ).toBe( false );
        done();
    });

});