import { useState } from 'react'
import styles from '../styles/MapCard.module.css'
import { HighlightOff } from '@material-ui/icons'
import {animated, useSpring} from 'react-spring'
import { MdKeyboardBackspace} from 'react-icons/md'
import { useRouter } from 'next/router'

const config = {
  tension: 170,
  clamp: true
}

export default function MapCard({event, close}) {
  
  const [fullView, setFullView] = useState(false)
  const router = useRouter();

  const animatedCard = useSpring({
    height: fullView ? "100vh" : "30vh",
    width: fullView ? "calc( 100vw )" : "calc( 95vw )",
    padding: fullView ? "0rem" : "1rem",
    margin: fullView ? "0px 0px" : "15px 2.5vw",
    borderRadius: fullView ? "0px" : "10px",
    config
  })

  const animatedTitle = useSpring({
    fontSize: fullView ? "2rem" : "1.4rem",
    config
  })

  const animatedPhotos = useSpring({
    height: fullView ? "30vh" : "0vh",
    config
  })

  const animatedNavbar = useSpring({
    height: fullView ? "3rem" : "0rem",
    config
  })

  const animatedHideOnFull = useSpring({
    opacity: fullView ? 0 : 1,
    config: { mass: 150, tension: 280, friction: 60, clamp: true }
  })

return (
    <animated.div className={styles.cardFull} style={animatedCard}>
      <animated.header className={styles.header} style={animatedNavbar}>
        <MdKeyboardBackspace onClick={()=>setFullView(false)}></MdKeyboardBackspace>
          <img src="/images/logo.png" alt="logo"/>
      </animated.header>
      <animated.div className={styles.Fphotos} style={animatedPhotos}>
        {event.photos?.map(photo=>(
          <img src="" alt="e"/>
        ))}
      </animated.div>
      <main className={styles.Fmain}>
        <animated.div className={styles.Ftitle} style={animatedTitle}>
          {event.name}
        </animated.div>
        <div className={styles.Fdescription}>
          {event.description}
        </div>
      </main>
      <animated.div className={styles.options} style={{display: fullView ? "none" : "block"}}>
        <div className={styles.date} >{(new Date(event.date)).toLocaleDateString()}</div>
        <button className={styles.button} onClick={()=>setFullView(true)}>more</button>
        <animated.div className={styles.close} onClick={close} style={animatedHideOnFull}> <HighlightOff /></animated.div>
      </animated.div>
    </animated.div>
  )
}
