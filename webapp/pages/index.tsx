import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useEffect, useContext} from 'react'
import { UserContext } from '../components/UserContext'
import styled, {keyframes} from 'styled-components';


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

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 20s infinite;
  color: white;
  flex-direction: column;

`

const Logo = styled.img`
    height: 100px;
`

const L = styled.div`
  font-size: 2rem;
  font-weight: 700;
`

const Header = styled.header`
  font-size: 2rem;
  font-weight: 700;
`

const Main = styled.main`
  max-width: 600px;
  & > span{
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

export default function Index() {
  const router = useRouter();
  const {token, loading} = useContext(UserContext);

  useEffect(()=>{
    if(loading) return;
    if(token) {
      router.push('/home');
    }
  }, [token, loading])

  return (
    <Container>
      <Head>
        <title>Sign in to Life</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      <meta lang="en"></meta>
      </Head>
      <Header>
        <Logo src="/logo.png"/>
      </Header>
      <Main>
        <span>
          <div>- complete the reports</div>
          <div>- take part in the events</div>
          <div>- meet new people</div>
          <div>- become a healthy person</div>
        </span>
        <h2>
          Install now by selecting 'add to home screen' in your mobile web browser
        </h2>
        <L>

        <Link href='/login'>Sign in</Link>
        </L>
      </Main>
    </Container>
  )
}
