import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/activation.module.css'
import { useRouter } from 'next/router'
import useAccountActivation from '../../hooks/useAccountActivation';
import {useEffect} from 'react'


export default function Token() {

    const router = useRouter();
    const { token } = router.query;

    const {makeActivation, isError, isLoading, isSuccess} = useAccountActivation();


    useEffect(() => {
      if(typeof token === 'string') makeActivation(token);
    }, [token])

    return (
    <div className={styles.container}>
      <Head>
        <title>Account activation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <img src="/images/logo.png" alt="logo"/>
        
        {isLoading && <h1 className={styles.title}>
          Proceding activation...
        </h1>}

        {isError && <h1 className={styles.title}>
          Sorry, there was a problem ;(
        </h1>}

        {isSuccess && <>
        <h1 className={styles.title}>
          Your account have been activated
        </h1>
        <Link href='/login'>Sign in</Link>
        </>}

        
      
      </main>
    </div>
  )
}