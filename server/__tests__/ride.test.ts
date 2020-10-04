import TestFactory from './preconfig'


const database = {

    user: [{
        id: "1",
        name: "User",
        email: "user@example.com",
        password: "pass123",
        active: true,
        rides: ["3123"]
    }],
    ride: []
}

const testFactory = TestFactory(database);

describe('Add ride', ()=>{
    
    const newRide = {
        line: 5,
        busNumber: 11,
        userId: "1",
        date: new Date()
    }

    it('adding', async (done)=>{
        const result = await testFactory.rideService.createRide(newRide.userId, newRide.line, newRide.busNumber, newRide.date);

        expect( result ).toBe( true );
        done();
    });

    it('data is correct', async (done)=>{
        const result = await testFactory.userService.getUser(newRide.userId);

        expect( result ).not.toBe( undefined );
        if(!result) return done();

        expect( result?.rides?.length ).toBeGreaterThan( 0 );

        expect( result.rides[0].line ).toBe( newRide.line );
        expect( result.rides[0].busNumber ).toBe( newRide.busNumber );
        expect( result.rides[0].date ).toBe( newRide.date );

        done();
    });

});