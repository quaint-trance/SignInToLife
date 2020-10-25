import ENDPOINT from '../ENDPOINT';
import { useQuery } from 'react-query'

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const useChart = (token: string, wait: boolean) =>{
    
    const {isLoading, error, data} = useQuery('score', ()=>
    fetch(ENDPOINT+'/score/getScore', {
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
            initialData: [],
            initialStale: true,
            cacheTime: 1000*60*10
    });
    

    return {
        isLoading,
        data:{
            labels: [1, 2, 3, 4, 5, 6, 7].map(el=>{
                const d = new Date();
                d.setDate(d.getDate() - (7-el));
                return weekdays[d.getDay()];
            }),
            datasets: [{
                label: "points",
                data: data.map ? data?.map(el=>el.score) : []
            }],
        }
    };
}
export default useChart;