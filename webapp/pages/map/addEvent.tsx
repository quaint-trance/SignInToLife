import Head from 'next/head'
import Link from 'next/link'
import useAddEvent from '../../hooks/useAddEvent'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../components/UserContext'
import styles from '../../styles/AddEvent.module.css'
import { useRouter } from 'next/router'
import useLoginAccess from '../../hooks/useLoginAccess'

export default function Login() {
  
    const { token } = useContext( UserContext )
    const { add, isLoading, isError, isSuccess } = useAddEvent(token);
    useLoginAccess();

    const router = useRouter();

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        add(event.target.name.value, new Date(), {x: event.target.x.value, y: event.target.y.value});
    }

    return (
    <div className={styles.container}>
      <Head>
        <title>Sign in to Paseo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <img src="/images/logo.png" alt="logo"/>
        <h1 className={styles.title}>
          Sign in to Your account
        </h1>
        <form className={styles.form} onSubmit={handleFormSubmit} >
            
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            
            <label htmlFor="x">x</label>
            <input type="text" name="x" id="x"/>
            
            <label htmlFor="y">y</label>
            <input type="text" name="y" id="y"/>

            <button>Sign in</button>

            <div>{ isLoading && "Loading" }{ isSuccess && "Success" }{ isError && "Error" }</div>
        </form>
      </main>
    </div>
  )
}