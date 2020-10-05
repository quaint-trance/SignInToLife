import styles from '../styles/MapCard.module.css'
import Link from 'next/link'
import { HighlightOff } from '@material-ui/icons'

export default function MapCard({event, close}) {
  return (
    <div className={styles.card}>
        <div className={styles.close} onClick={close}> <HighlightOff /></div>
        <div className={styles.title}>{event.name}</div>
        <div>{event.date}</div>
    </div>
  )
}
