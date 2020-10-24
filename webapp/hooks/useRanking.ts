import { useQuery } from 'react-query'
import ENDPOINT from '../ENDPOINT';

const useRanking = (token: string, wait: boolean) =>{

    const {isLoading, error, data} = useQuery('ranking', ()=>
    fetch(ENDPOINT+'/league/getLeaderboard', {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        },
    }).then(res=>{
        if(res.status === 204 ) 
            return {level: -2, leaderboard: []};
        else return res.json()
    }
    ),{
            enabled: !wait,
            initialData: {
                level: -1,
                leaderboard: []
            },
            initialStale: true,
            cacheTime: 1000*60*20,
            refetchInterval: 1000*60*1
    });

    return {
        isLoading,
        data:{
            ...data,
            ends: new Date( (new Date(data.ends)).getTime() - Date.now() ),
            leaderboard: data.leaderboard.map((el, index)=> {return {...el, index}})
        }
    }
}

export default useRanking;

