import {  useMutation, useQuery } from 'react-query'
import ENDPOINT from '../ENDPOINT'
import { useState } from 'react'

const useParticipate =  (token: string, eventId:string) =>{

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

    const act = useQuery('activity'+eventId, ()=>
        fetch(ENDPOINT+'/events/getEventActivity', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'id': eventId
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
        submit: (eventId: string) => mutate(eventId),
        isSuccess,
        isLoading,
        isError,
        activity: act?.data
    }
}

export default useParticipate;