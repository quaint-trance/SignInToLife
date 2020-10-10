import TestFactory from './preconfig'

const database = {

    user: [{
        id: "1",
        name: "User",
        email: "user@example.com",
        password: "pass123",
        active: true
    }],
    event: [],
    league: []
}

const testFactory = TestFactory(database);
describe('Register correctly', ()=>{

    const newUser = {
        email: "newUser@example.com",
        name: "newUser",
        password: "passw0rd"
    }


    it('correctly', async (done)=>{
        const result = await testFactory.userService.register(newUser.name, newUser.email, newUser.password);
        
        expect( result ).toBe( true );
        done();
    });

    it('password is hashed', async (done)=>{
        const foundUser = await testFactory.userService.entities.user.find({ email: newUser.email });
        
        expect( foundUser?.password ).not.toEqual( newUser.password );
        done();
    });


});

describe('Register incorrect', ()=>{

    it('email already exists', async (done)=>{
        const result = await testFactory.userService.register("user", "user@example.com", "passw0rd");
        
        expect( result ).not.toBe( true );
        done();
    });


});