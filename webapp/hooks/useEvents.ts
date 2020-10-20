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
            cacheTime: 1000*60*10
        }
    );

    return {
        events: data.map(el => ({
            ...el,
            location: {
                lat: el.place.x / 1,
                lng: el.place.y / 1,
            },
        })),
        isLoading,
        isError,
        error
    }
}