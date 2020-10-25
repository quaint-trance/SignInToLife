import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAccountActivation from '../../hooks/useAccountActivation';
import {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'


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
  display: grid;
  grid-template-rows: 2fr auto 0fr auto 2fr auto .5fr;
  min-height: 100vh;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 8s infinite;
  color: white;
  text-align: center;
  padding: 20px;

  & > h1{
    grid-row: 4 / 5;
  }
`

const Logo = styled.img`
  width: 70%;
  margin: auto;
`

const Button = styled.button`
    outline: none;
    position: relative;
    background-color: white;  
    border: none;
    color: rgba(0, 0, 0, 0.952);
    border-radius: 15px;
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    line-height: 10vw;
    padding: 10px 10px;
    margin-bottom: 10px;
    grid-row: 6 / 7;

    &:touch-action{
      transform: scale(.95)
    }

    & > span {
      background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
        -webkit-text-fill-color: transparent; 
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 900;
      }
`

export default function Token() {

    const router = useRouter();
    const { token } = router.query;

    const {makeActivation, isError, isLoading, isSuccess} = useAccountActivation();


    useEffect(() => {
      if(typeof token === 'string') makeActivation(token);
    }, [token])

    return (
    <Container>
      <Head>
        <title>Account activation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

          <Logo src="/logo.png" alt="logo" />
        
        {isLoading && <h1>
          Proceding activation...
        </h1>}

        {isError && <h1>
          Sorry, there was a problem ;(
        </h1>}

        {isSuccess && <>
        <h1>
          Your account have been activated
        </h1>
          <Button>
        <Link href='/login'>
            <span>Sign in</span>
        </Link>
          </Button>
        </>}

    </Container>
  )
}