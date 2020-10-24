import ENDPOINT from '../ENDPOINT';
import { useQuery } from 'react-query'


const useChart = (token: string, wait: boolean) =>{
    
    const {isLoading, error, data} = useQuery('streak', ()=>
    fetch(ENDPOINT+'/score/getStreak', {
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
                score: 0,
                point: 0
            },
            initialStale: true,
            cacheTime: 1000*60*10
    });
    

    return {
        isLoading,
        data
    };
}
export default useChart;