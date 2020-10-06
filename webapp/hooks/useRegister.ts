import { useQuery, useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'

const useRegister =  () =>{

    const [mutate, obj] = useMutation((data: {email: string, password: string, name: string})=>
    fetch(ENDPOINT+'/auth/register', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': data.name,
            'email': data.email,
            'password': data.password
        })
    }).then(res=>{
        if(Math.floor(res.status/100) === 4) throw new Error(res.status+'');
    })
    )

    return {
        singin: async (email: string, password: string, name: string)=>{
           mutate({email, password, name});
        },
        isLoading: obj.isLoading,
        isError: obj.isError,
        isSuccess: obj.isSuccess,
        obj
    }
}

export default useRegister;