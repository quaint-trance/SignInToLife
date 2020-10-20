import Head from 'next/head'
import useAddEvent from '../../hooks/useAddEvent'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../components/UserContext'
import styles from '../../styles/AddEvent.module.css'
import { useRouter } from 'next/router'
import useLoginAccess from '../../hooks/useLoginAccess'
import { ArrowBack, Check, Close } from '@material-ui/icons'

export default function Login() {
  
    const { token } = useContext( UserContext );
    const { add, isLoading, isError, isSuccess } = useAddEvent(token);
    useLoginAccess();

    const router = useRouter();

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        add(event.target.name.value, new Date(), {x: event.target.x.value, y: event.target.y.value}, event.target.description.value);
    }

    return (
    <div className={styles.container}>
      <Head>
        <title>Add Event</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <ArrowBack onClick={()=>router.back()}></ArrowBack>
          <img src="/images/logo.png" alt="logo"/>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create new event
        </h1>
        <form className={styles.form} onSubmit={handleFormSubmit} >
            
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"/>
            
            <label htmlFor="x">x</label>
            <input type="text" name="x" id="x"/>
            
            <label htmlFor="y">y</label>
            <input type="text" name="y" id="y"/>

            <button>create event</button>

            <div> 
              {isSuccess && <div className={styles.done}><Check/></div>}
              {isError && <div className={styles.error}><Close/></div>}
              {isLoading && <div className={styles.loading}></div>}
               
              
            </div>
        </form>
      </main>
    </div>
  )
}