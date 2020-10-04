import Head from 'next/head'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { Home, Map, Settings, TrendingUp } from '@material-ui/icons'

export default function Navbar() {
  return (
    <nav className={styles.container}>
        <Link href='/home' >
          <div className={styles.element}>
              <Home /> Home
            </div>
        </Link>
        <Link href='/map' >
          <div className={styles.element}>
            <Map /> Map
          </div>
        </Link>
        <Link href='/ranking' >
          <div className={styles.element}>
            <TrendingUp/>Ranking
          </div>
        </Link>
        <Link href='/settings' >
          <div className={styles.element}>
            <Settings/> Settings
          </div>
        </Link>
    </nav>
  )
}
