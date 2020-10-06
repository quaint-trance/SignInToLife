import Head from 'next/head'
import Link from 'next/link'
import useLogin from '../hooks/useLogin'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'

export default function Login() {
  
    const { singin, isLoading, isError, isSuccess, responseToken } = useLogin();
    const {setToken, token, loading} = useContext(UserContext);

    const router = useRouter();

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        singin(event.target.email.value, event.target.pass.value);
    }

    useEffect(()=>{
        if(responseToken) setToken(responseToken);
    }, [responseToken]);

    useEffect(()=>{
      if(loading) return;
      if(token) {
        router.push('/home');
      }
    }, [token, loading])

    return (
    <div className={styles.container}>
      <Head>
        <title>Sign in to Hackheroes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <img src="/images/logo.png" alt="logo"/>
        <h1 className={styles.title}>
          Sign in to Your account
        </h1>
        <form className={styles.form} onSubmit={handleFormSubmit} >
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
            <label htmlFor="pass">Password</label>
            <input type="password" name="pass" id="pass"/>
            <button>Sign in</button>
            <div>{ isLoading && "Loading" }{ isSuccess && "Success" }{ isError && "Error" }</div>
            <Link href='/register'>Don't have an account?</Link>
        </form>
      </main>
    </div>
  )
}