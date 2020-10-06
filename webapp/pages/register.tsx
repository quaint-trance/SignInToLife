import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import useRegister from '../hooks/useRegister';
import styles from '../styles/Register.module.css'
import { useRouter } from 'next/router'
import { UserContext } from '../components/UserContext'

export default function Register() {
  
    const {obj,  singin, isLoading, isError, isSuccess } = useRegister();
    const {token, loading} = useContext(UserContext);
    const router = useRouter();
    const handleFormSubmit = (event) =>{
        event.preventDefault();
        singin(event.target.email.value, event.target.pass.value, event.target.name.value);
    }

    useEffect(() => {
        console.log(obj);
    }, [obj])

    useEffect(()=>{
      if(loading) return;
      if(token) {
        router.push('/home');
      }
    }, [token, loading])

    return (
    <div className={styles.container}>
      <Head>
        <title>Create an account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <img src="/images/logo.png" alt="logo"/>
        <h1 className={styles.title}>
          Create an account
        </h1>
        <form className={styles.form} onSubmit={handleFormSubmit} >
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name"/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email"/>
            <label htmlFor="pass">Password</label>
            <input type="password" name="pass" id="pass"/>
            <button>Sign up</button>
            <div>{ isLoading && "Loading" }{ isSuccess && "Success" }{ isError && "Error" }</div>
            <Link href='/login'>Have an account?</Link>
        </form>
      </main>
    </div>
  )
}
