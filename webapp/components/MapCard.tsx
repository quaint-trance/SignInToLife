import { useState } from 'react'
import styles from '../styles/MapCard.module.css'
import { HighlightOff } from '@material-ui/icons'
import {animated, useTransition} from 'react-spring'

export default function MapCard({event, close, style}) {
  
  const [visible, setVisible] = useState(true)

  return (
    <>
    <div className={styles.card} style={style}>
        <div className={styles.close} onClick={close}> <HighlightOff /></div>
        <div className={styles.title}>{event.name}</div>
        <div>{event.date}</div>
    </div>
  </>
  )
}

