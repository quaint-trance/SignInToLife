import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { MdHome, MdExplore, MdTrendingUp, MdSettings } from 'react-icons/md'
import { useRouter } from 'next/router'

export default function Navbar() {

  const router = useRouter();

  return (
    <nav className={styles.container}>
        <Link href='/home' >
          <div className={`${styles.element} ${router.pathname==='/home' && styles.active}`}>
              <MdHome /> Home
            </div>
        </Link>
        <Link href='/map' >
          <div className={`${styles.element} ${router.pathname==='/map' && styles.active}`}>
            <MdExplore /> Map
          </div>
        </Link>
        <Link href='/ranking' >
          <div className={`${styles.element} ${router.pathname==='/ranking' && styles.active}`}>
            <MdTrendingUp/>Ranking
          </div>
        </Link>
        <Link href='/settings' >
          <div className={`${styles.element} ${router.pathname==='/settings' && styles.active}`}>
            <MdSettings/> Settings
          </div>
        </Link>
    </nav>
  )
}
