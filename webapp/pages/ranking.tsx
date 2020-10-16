import Head from 'next/head'
import styles from '../styles/ranking.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import useLoginAccess from '../hooks/useLoginAccess'
import { useContext } from 'react'
import useRanking from '../hooks/useRanking'
import { UserContext } from '../components/UserContext'
import { ImDiamonds } from 'react-icons/im'
import { useTransition, animated } from 'react-spring'

const leaguesNames = ['Bronze', 'Silver', 'Gold','Emerald', 'Diamond'];
const leaguesColors = ['#bd6628', '#d1d1d1', '#edda05', '#34ed41', '#34b7eb']

export default function Ranking() {

  useLoginAccess();
  const {token, loading} = useContext(UserContext);
  const {isLoading, data} = useRanking(token, loading);

  const leaderboardTransition = useTransition(data?.leaderboard, el => `${el._id}${el.index}`, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config:{duration: 1000*.5}
  })

  return (
    <div className={styles.container}>
    <Head>
      <title>Ranking</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta lang="en"></meta>
    </Head>
    <header className={styles.header}>
      <div className={styles.diamondIcons}>

        {leaguesNames.map((name, index)=>
            <div 
            style={{color: leaguesColors[index]}}
            className={index===data?.level ? styles.active : styles.normal}
            >
              <ImDiamonds/>
            </div>
        )}
        </div>
        <div className={styles.title}>
          {data.level >= 0 && `${leaguesNames[data?.level]} League`}
        </div>
    </header>
    <main className={styles.main}>
      {data.level === -2 && "You are not in any league currently"}
      {leaderboardTransition.map(({item, props, key}, index)=>
        <animated.div className={styles.pos} style={props} key={key}>
          <div>{index+1}. {item?.name}</div><div>{item?.score}</div>
        </animated.div>
      )}
    </main>
    <Navbar />
    </div>
  )
}
