import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext'

const useLoginAccess = () =>{
    const {token, loading} = useContext(UserContext);
    const router = useRouter();

    useEffect(()=>{
        if(loading) return;
        if(!token) {
          router.push('/login');
        }
      }, [token, loading])
}

export default useLoginAccess;