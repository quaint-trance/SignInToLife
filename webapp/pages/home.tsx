import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          home
        </h1>
        <Navbar />
      </main>

    </div>
  )
}
