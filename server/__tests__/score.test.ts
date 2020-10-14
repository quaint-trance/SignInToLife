import jwt from "jsonwebtoken"
// @ts-ignore
import TestFactory from './preconfig'


const database = {

    user: [{
        id: "1",
        name: "User",
        email: "user@example.com",
        password: "pass123e",
        active: true,
        gainedScoreHistory:[{
            score: 20,
            date: new Date('10.10.2020')
        },{
            score: 30,
            date: new Date('10.14.2020')
        },{
            score: 35,
            date: new Date('10.08.2020')
        },{
            score: 20,
            date: new Date('10.07.2020')
        },{
            score: 10,
            date: new Date('10.12.2020')
        },{
            score: 50,
            date: new Date('10.03.2020')
        }]
    }],
    event: [],
    league: []
}

const testFactory = TestFactory(database);
process.env.TOKEN_K = 'e'
describe('get Score weeke', ()=>{
    
    it('correctly', async (done)=>{
        const result = await testFactory.userService.getScore("1");
       
       console.log(result);
        done();
    });
});