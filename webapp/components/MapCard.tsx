import { useState } from 'react'
import styles from '../styles/MapCard.module.css'
import { HighlightOff } from '@material-ui/icons'
import {animated, useTransition} from 'react-spring'
import { MdKeyboardBackspace} from 'react-icons/md'
import { useRouter } from 'next/router'

export default function MapCard({event, close}) {
  
  const [fullView, setFullView] = useState(false)
  const router = useRouter();

  if(fullView) return (
    <div className={styles.cardFull}>
      <header className={styles.header}>
        <MdKeyboardBackspace onClick={()=>setFullView(false)}></MdKeyboardBackspace>
          <img src="/images/logo.png" alt="logo"/>
      </header>
      <div className={styles.Fphotos}>
        {event.photos?.map(photo=>(
          <img src="" alt="e"/>
        ))}
      </div>
      <main className={styles.Fmain}>
        <div className={styles.Ftitle}>
          {event.name}
        </div>
        <div className={styles.Fdescription}>
          {event.description}
        </div>
      </main>
    </div>
  )
  else return (
    <div className={styles.card}>
      <div className={styles.close} onClick={close}> <HighlightOff /></div>
      <div className={styles.title}>{event.name}</div>
      <div className={styles.description}>{event.description}</div>
      <div className={styles.options}>
        <div className={styles.date} >{(new Date(event.date)).toLocaleDateString()}</div>
        <button className={styles.button} onClick={()=>setFullView(true)}>more</button>
      </div>
    </div>
  )
}

