import {  useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'
import { useState } from 'react'

const useParticipate =  (token: string) =>{

    const [done, setDone] = useState(false);


    const [mutate, {isLoading, isError, isSuccess}] = useMutation((eventId:string)=>
    fetch(ENDPOINT+'/events/participate', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({
            'eventId': eventId,
        })
    }).then(res=>{
        if(Math.floor(res.status/100) === 4) throw new Error(`${res.status}`);
        else return res.json();
    }))

    return {
        submit: (eventId: string) => mutate(eventId),
        isSuccess,
        isLoading,
        isError
    }
}

export default useParticipate;