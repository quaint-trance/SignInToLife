import ENDPOINT from '../ENDPOINT';
import { useQuery } from 'react-query';


export default ()=>{

    const {isLoading, error, data, isError} = useQuery('events', ()=>
        fetch(ENDPOINT+'/events/getEvents', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res=>
            res.json()
        ),{
            initialData: [],
            initialStale: true,
        }
    );

    return {
        events: data,
        isLoading,
        isError,
        error
    }
}