//@ts-ignore
import TestFactory from './preconfig'


const database = {
    user: [{
        id: "1",
        name: "User",
        email: "user@example.com",
        password: "pass123e",
        active: true
    },{
        id: "2",
        name: "User2",
        email: "user2@example.com",
        password: "pass123e",
        active: true
    },{
        id: "3",
        name: "User3",
        email: "user3@example.com",
        password: "pass123e",
        active: true
    }],
    event: [],
    league: [{
        id: "e",
        level: "silver",
        participators: []
    }]
}

const testFactory = TestFactory(database);

describe('League create', ()=>{

    it('', async (done)=>{
        const result = await testFactory.entities.league.create(1);
        expect( result ).not.toBe( false );
        if (!result) return;

        done();
    });

});

describe('user & league', ()=>{
    it('add user to league', async(done)=>{
        const league = await testFactory.entities.league.find({id: "e"});
        expect( league ).not.toBe( undefined );
        if(!league) return;

        const result = await league.addParticipant("1");
        const result2 = await league.addParticipant("2");
        await league.addParticipant("3");

        expect(result && result2).toBe(true);
        console.log( league.participators )
        expect( league.participators.length ).toBe(3);
        done();
    })

    it('add points and get leaderboard', async(done)=>{
        const league = await testFactory.entities.league.find({id: "e"});
        expect( league ).not.toBe( undefined );
        if(!league) return;

        await league.changeScore('1', 10);
        await league.changeScore('2', -10);

        const lb = league.getLeaderboard();

        expect( lb[0].id ).toBe('1');
        expect( lb[0].score ).toBe(10);
        expect( lb[1].id ).toBe('3');
        expect( lb[1].score ).toBe(0);
        expect( lb[2].id ).toBe('2');
        expect( lb[2].score ).toBe(-10);

        done();
    })

    it('get full leaderboard', async (done) =>{
        
        const lb = await testFactory.leagueService.getLeaderboardToUser('1');
        console.log(lb);

        //expect( await lb[0].name )
        
        done();
    })

})