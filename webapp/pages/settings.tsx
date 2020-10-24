import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext'
import styles from '../styles/Settings.module.css'
import { useRouter } from 'next/router'
import { MdChevronRight } from 'react-icons/md'
import Navbar from '../components/Navbar'

export default function Login() {
  
    const {setToken, token, loading, logout} = useContext(UserContext);
    const router = useRouter();

    const handleLogout = () =>{
        logout();
        router.push('/')
    }

    return (
    <div className={styles.container}>
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className={styles.about}>
              <img src="" alt="prof"/>
              <div>UserName</div>
              <div>user@example.com</div>
          </div>
          <section>
              <h3>Profile Settings</h3>
              <div><span>Theme</span>  <span><MdChevronRight/></span></div>
              <div><span> Notifications</span>  <span><MdChevronRight/></span></div>
              <div onClick={handleLogout}><span> Logout</span>  <span><MdChevronRight/></span></div>
          </section>
      </main>
      <Navbar />
    </div>
  )
}