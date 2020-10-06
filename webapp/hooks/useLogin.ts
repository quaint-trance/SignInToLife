import { useQuery, useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'
import { useState } from 'react'

const useLogin =  () =>{

    const [responseToken, setResponseToken] = useState();

    const [mutate, {isLoading, isError, isSuccess}] = useMutation((data: {email: string, password: string})=>
    fetch(ENDPOINT+'/auth/login', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': data.email,
            'password': data.password
        })
    }).then(res=>{
        if(Math.floor(res.status/100) === 4) throw new Error(res.status+'');
        else return res.json();
    }).then(rt =>
        setResponseToken(rt.result)
        )
    )

    return {
        singin: async (email: string, password: string)=>{
           mutate({email, password});
        },
        isLoading,
        isError,
        isSuccess,
        responseToken
    }
}

export default useLogin;