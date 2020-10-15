import Head from 'next/head'
import styles from '../styles/ranking.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import useLoginAccess from '../hooks/useLoginAccess'
import { useContext } from 'react'
import useRanking from '../hooks/useRanking'
import { UserContext } from '../components/UserContext'

const leaguesNames = ['silver', 'gold', 'diamond'];

export default function Ranking() {

  const {token, loading} = useContext(UserContext);
  const {isLoading, data} = useRanking(token, loading);

  return (
    <div className={styles.container}>
    <Head>
      <title>Ranking</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta lang="en"></meta>
    </Head>
    <header className={styles.header}>
        {leaguesNames[data?.level]} league
    </header>
    <main className={styles.main}>
      {data?.leaderboard.map((el, index)=>
        <div className={styles.pos}>
          <div>{index+1}. {el.name}</div><div>{el.score}</div>
        </div>
      )}
    </main>
    <Navbar />
    </div>
  )
}
