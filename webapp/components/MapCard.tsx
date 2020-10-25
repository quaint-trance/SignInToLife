import { useState, useContext, useCallback } from 'react'
import styles from '../styles/MapCard.module.css'
import { HighlightOff } from '@material-ui/icons'
import {animated, animated as a, useSpring, useTransition, useSprings} from 'react-spring'
import { MdKeyboardBackspace} from 'react-icons/md'

import { useDrag } from 'react-use-gesture'
import useParticipate from '../hooks/useParticipate'
import { UserContext } from './UserContext'

const config = {
  tension: 170,
  friction: 10,
  clamp: true
}

export default function MapCard({event, close}) {
  
  const [fullView, setFullView] = useState(false);
  const { token } = useContext(UserContext);
  
  const [navCard, setNavCard] = useState(0);

  const {isSuccess, submit, activity} = useParticipate(token, event?.id);

  const animatedCard = useSpring({
    height: fullView ? "100vh" : "30vh",
    width: fullView ? "calc( 100vw )" : "calc( 95vw )",
    padding: fullView ? "0rem" : "1rem",
    margin: fullView ? "0px 0px" : "15px 2.5vw",
    borderRadius: fullView ? "0px" : "10px",
    config
  })

  const animatedTitle = useSpring({
    fontSize: fullView ? "1.7rem" : "1.4rem",
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
    config
  })

  const bindFull = useDrag(({direction}) => {
      const x = Math.floor(direction[1]*100);
      //if(!fullView && x < -90) setFullView(true);
      //if(fullView && x > 90) setFullView(false);
  })

  const formDate = (dateString: string) =>{
    if(!dateString) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    return `${date.getDay()} ${months[date.getMonth()]}`
  }

  const pages = [
    ({ style }) => 
      <a.section {...bindCardsNav()} style={style}>
        <div className={styles.Fdescription}>
          {event.description}
        </div>
        <button onClick={()=>submit(event.id)} className={styles.buttonP} style={{display: !fullView ? "none" : "block"}} >Participate</button>
      </a.section>,
    ({ style }) => 
      <a.section {...bindCardsNav()} style={style}>
        <div className={styles.activity}>
          {activity?.slice(0, Math.min(activity.length, 10)).map(el=>(
            <div><div>img</div><div>{el?.user?.name}</div><div>{formDate(el?.date)}</div> <div>{el?.data}</div></div>
            ))}
        </div>
      </a.section>,
    ({ style }) => 
      <a.section {...bindCardsNav()} style={style}>
        <div className={styles.info}>     
        </div>
      </a.section>,
  ]

  const changeNavCard = useCallback((delta: number) => setNavCard(t => t+delta), [])

  const transitions = useTransition(navCard, p => p, {
    from: { opacity: 0, transform: `translate3d(100%,0,0)` },
    enter: { opacity: 1, transform: `translate3d(0%,0,0)`  },
    leave: { opacity: 0, transform: `translate3d(100%,0,0)` },
  })

  
  const bindCardsNav = useDrag(({direction}) => {
    const y = Math.floor(direction[0]*100);
    if(navCard !== 0 && y > 90) changeNavCard(-1);
    if(navCard !== 2 && y < -90) changeNavCard(1);
})


return (
    <a.div  {...bindFull()} className={fullView ? styles.cardFull : styles.card} style={animatedCard}>
      
      <a.header className={styles.header} style={animatedNavbar}>
        <MdKeyboardBackspace onClick={()=>setFullView(false)}></MdKeyboardBackspace>
          <img src="/images/logo.png" alt="logo"/>
      </a.header>

      <a.div className={styles.Fphotos} style={animatedPhotos}>
        {event.photos?.map(photo=>(
          <img src="" alt="e"/>
        ))}
      </a.div>
      
      <main className={styles.Fmain}>
        <header>
          <a.div className={styles.Ftitle} style={animatedTitle}>
            {event.name}
          </a.div>
          <nav style={{display: !fullView ? "none" : "flex"}} className={styles.cardNav}>
            <div className={navCard == 0  && styles.active} onClick={()=>setNavCard(0)}>about</div>
            <div className={navCard == 1  && styles.active} onClick={()=>setNavCard(1)}>activity</div>
            <div className={navCard == 2  && styles.active} onClick={()=>setNavCard(2)}>info</div>
          </nav>
        </header>

        {navCard === 0 && <section {...bindCardsNav()}>
        <div className={styles.Fdescription}>
          {event.description}
        </div>
        <button onClick={()=>submit(event.id)} className={styles.buttonP} style={{display: !fullView ? "none" : "block"}} >Participate</button>
      </section>}

      {navCard===1 &&<section {...bindCardsNav()}>
        <div className={styles.activity}>
          {activity?.slice(0, Math.min(activity.length, 10)).map(el=>(
            <div><div>img</div><div>{el?.user?.name}</div><div>{formDate(el?.date)}</div> <div>{el?.data}</div></div>
            ))}
        </div>
      </section>}

      {navCard===2 &&<section {...bindCardsNav()}>
        
      </section>}

      </main>
      
      <a.aside className={styles.options} style={{display: fullView ? "none" : "block"}}>
        <div className={styles.date} >{(new Date(event.date)).toLocaleDateString()}</div>
        <button className={styles.button} onClick={()=>setFullView(true)}>more</button>
        <a.div className={styles.close} onClick={close} style={animatedHideOnFull}> <HighlightOff /></a.div>
      </a.aside>

    </a.div>
  )
}
