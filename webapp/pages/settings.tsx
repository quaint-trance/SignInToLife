import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext'
import styles from '../styles/Settings.module.css'
import { useRouter } from 'next/router'
import { MdChevronRight } from 'react-icons/md'
import Navbar from '../components/Navbar'

import styled, {keyframes} from 'styled-components'
import useLoginAccess from '../hooks/useLoginAccess'

const bgAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Container = styled.main`
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 8s infinite;
`

export default function Login() {
    useLoginAccess();
    const {setToken, token, loading, logout} = useContext(UserContext);
    const router = useRouter();

    const handleLogout = () =>{
        logout();
        router.push('/')
    }

    return (
    <Container className={styles.container}>
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
    </Container>
  )
}