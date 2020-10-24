import Head from 'next/head'
import styles from '../styles/Index.module.css'
import Link from 'next/link'

export default function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      <meta lang="en"></meta>
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          <Link href='/home'> go home </Link>
        </h1>
      </main>

    </div>
  )
}
