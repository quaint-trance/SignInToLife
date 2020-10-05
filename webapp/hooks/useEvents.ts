import ENDPOINT from '../ENDPOINT';
import { useQuery } from 'react-query';


export default ()=>{

    const {isLoading, error, data} = useQuery('events', ()=>
        fetch(ENDPOINT+'/events/getEvents', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': ""
            },
        }).then(res=>
            res.json()
        ),{
            staleTime: 60*1000
        }
    );

    return {
        events: data,
        isLoading,
        error
    }
}