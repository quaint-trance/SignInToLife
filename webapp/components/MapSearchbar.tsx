import styles from '../styles/MapSearchbar.module.css'
import Link from 'next/link'
import { Search } from '@material-ui/icons'

export default function MapSearchbar({event, close}) {
  return (
    <div className={styles.searchbar}>
        <Search /> <input placeholder="search..."></input>
    </div>
  )
}
