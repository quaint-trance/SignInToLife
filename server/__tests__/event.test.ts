//@ts-ignore
import TestFactory from './preconfig'


const database = {
    user: [],
    event: [{
        creatorId: "1",
        date: new Date(),
        place:{
            x: "3123123",
            y: "5435351"
        },
        name: "Hehe dobre dobre",
        id: "3123r12"
    }]
}

const testFactory = TestFactory(database);

describe('Add Event', ()=>{
    
    const newEvent = {
        creatorId: "1",
        date: new Date(),
        place:{
            x: "3123123",
            y: "3231231"
        },
        name: "hehehe"
    }

    it('adding', async (done)=>{
        const result = await testFactory.eventService.createEvent(newEvent.date, newEvent.place, newEvent.creatorId, newEvent.name);
        expect( result ).toBe( true );
        done();
    });
});


describe('Get Events', ()=>{
    it('e', async (done)=>{
        const results = await testFactory.eventService.getAll();
        if( !results ) return false;
        expect(results.length).toBe(2);
        done();
    })
});