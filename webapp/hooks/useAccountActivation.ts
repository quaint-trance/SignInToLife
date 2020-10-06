import { useQuery, useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'

const useAccountActivation =  () =>{

    const [mutate, {isLoading, isError, isSuccess}] = useMutation((token: string)=>
    fetch(ENDPOINT+'/activation', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'token': token,
        })
    }).then(res=>{
        if(Math.floor(res.status/100) === 4) throw new Error(res.status+'');
        else return true;
    }
    )
    )

    return {
        makeActivation: async (token: string)=>{
           mutate(token);
        },
        isLoading,
        isError,
        isSuccess
    }
}

export default useAccountActivation;