import { useQuery } from 'react-query'
import ENDPOINT from '../ENDPOINT';

const useRanking = (token: string, wait: boolean) =>{

    const {isLoading, error, data} = useQuery('events', ()=>
    fetch(ENDPOINT+'/league/getLeaderboard', {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        },
    }).then(res=>
        res.json()
        ),{
            enabled: !wait,
            initialData: {
                level: -1,
                leaderboard: []
            },
            initialStale: true,
    });

    return {
        isLoading,
        data
    }
}

export default useRanking;

