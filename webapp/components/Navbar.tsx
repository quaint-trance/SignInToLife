import Head from 'next/head'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { Home, Map, Settings, TrendingUp } from '@material-ui/icons'
import { useRouter } from 'next/router'

export default function Navbar() {

  const router = useRouter();

  return (
    <nav className={styles.container}>
        <Link href='/home' >
          <div className={`${styles.element} ${router.pathname==='/home' && styles.active}`}>
              <Home /> Home
            </div>
        </Link>
        <Link href='/map' >
          <div className={`${styles.element} ${router.pathname==='/map' && styles.active}`}>
            <Map /> Map
          </div>
        </Link>
        <Link href='/ranking' >
          <div className={`${styles.element} ${router.pathname==='/ranking' && styles.active}`}>
            <TrendingUp/>Ranking
          </div>
        </Link>
        <Link href='/settings' >
          <div className={`${styles.element} ${router.pathname==='/settings' && styles.active}`}>
            <Settings/> Settings
          </div>
        </Link>
    </nav>
  )
}
