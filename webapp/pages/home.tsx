import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import useLoginAccess from '../hooks/useLoginAccess'
import Chart from '../components/Chart'
import { useContext } from 'react'

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
      <div className={styles.title}>
        <img src="" alt="logo"/>
        <span>App name</span>
      </div>
      <div className={styles.chartBox}>
        <div className={styles.chart}>
          <Chart className={''}/>
        </div>
        <div className={styles.resum}>
            <div>
              <div>410</div>
              <div>points</div>
            </div>
            <div>
              <div>31</div>
              <div>days</div>
            </div>
        </div>
      </div>

      <div className={styles.buttonField}>
        <Link href='/raport'><button>new raport</button></Link>
      </div>

    </main>
    <Navbar />
    </div>
  )
}
