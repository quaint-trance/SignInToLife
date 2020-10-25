import Head from 'next/head'
import styles from '../styles/Index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useEffect, useContext} from 'react'
import { UserContext } from '../components/UserContext'

export default function Index() {
  const router = useRouter();
  const {token, loading} = useContext(UserContext);

  useEffect(()=>{
    if(loading) return;
    if(token) {
      router.push('/home');
    }
  }, [token, loading])

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in to Life</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      <meta lang="en"></meta>
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Sign in to life
          <Link href='/home'> go home </Link>
        </h1>
      </main>

    </div>
  )
}
