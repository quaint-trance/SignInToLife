import React, {useState, createContext, useEffect} from 'react';
import useLoginAccess from '../hooks/useLoginAccess';

interface contextType{
    token: string,
    setToken:any,
    loading: boolean,
    logout: ()=> void
}

    export const UserContext = createContext<contextType>( {token: '', setToken: ()=>{}, loading: true, logout: () =>{} });

export const UserProvider = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<null | string>();
    useLoginAccess();


    useEffect(()=>{
        const item = localStorage.getItem('token');
        if( item ) setToken( item );
        setLoading(false);
    }, [])

    useEffect(()=>{
        if(!token) return;
        localStorage.setItem('token', token);
    }, [token])

    const logout = () =>{
        localStorage.removeItem('token');
        setToken(null);
    }

    return(
        <UserContext.Provider value={ { token, setToken, loading, logout } }>
            {props.children}
        </UserContext.Provider>
    );

} ;