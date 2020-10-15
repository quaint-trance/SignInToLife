import ENDPOINT from '../ENDPOINT';
import { useQuery } from 'react-query'
import { useEffect } from 'react';

const useChart = (token: string, wait: boolean) =>{
    
    const {isLoading, error, data} = useQuery('events', ()=>
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
    });
        
    useEffect(() => {
        console.log(data);   
    })

    return {
        isLoading,
        data:{
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [{
                label: "e",
                data: data?.map(el=>el.score)
            }],
        }
    };
}
export default useChart;