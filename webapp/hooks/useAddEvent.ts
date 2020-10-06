import { useQuery, useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'

const useAddEvent =  (token: string) =>{

    const [mutate, {isLoading, isError, isSuccess}] = useMutation((data: {name: string, date: Date, place:{x:string, y:string}})=>
    fetch(ENDPOINT+'/events/addEvent', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({
            'name': data.name,
            'date': data.date,
            'place': data.place,
        })
    }).then(res=>{
        if(Math.floor(res.status/100) === 4) throw new Error(res.status+'');
        else return true;
    }))

    return {
        add: async (name: string, date: Date, place:{x:string, y:string})=>{
           mutate({name, date, place});
        },
        isLoading,
        isError,
        isSuccess
    }
}

export default useAddEvent;