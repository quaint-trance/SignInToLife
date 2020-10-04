import React, {useState, createContext, useEffect} from 'react';

interface contextType{
    token: string,
    setToken:any,
    loading: boolean
}

export const UserContext = createContext<contextType>( {token: '', setToken: ()=>{}, loading: true} );

export const UserProvider = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<null | string>();


    useEffect(()=>{
        const item = localStorage.getItem('token');
        if( item ) setToken( item );
        setLoading(false);
    }, [])

    useEffect(()=>{
        if(!token) return;
        localStorage.setItem('token', token);
    }, [token])

    return(
        <UserContext.Provider value={ { token, setToken, loading } }>
            {props.children}
        </UserContext.Provider>
    );

} ;