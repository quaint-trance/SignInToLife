import Head from 'next/head'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import useLoginAccess from '../hooks/useLoginAccess'
import Chart from '../components/Chart'
import { useContext } from 'react'
import { UserContext } from '../components/UserContext'
import useGetStreak from '../hooks/useGetStreak'
import styled, { keyframes } from 'styled-components'

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
  display: grid;
  grid-template-rows: 1fr auto 1fr auto 2fr auto 1fr;
  min-height: 100vh;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 8s infinite;
  color: white;
  padding: 15px;
`

const Header = styled.header`
  grid-row: 2 / 3;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const ChartBox = styled.div`
  grid-row: 4 / 5;
  border: 3px solid white;
  border-radius: 10px;
  display: grid;
  grid-template-rows: auto 40px;
  align-items: center;
  justify-content: center;
  padding: 10px;

  & > div{
    display: flex;
    justify-content: space-around;
    & > div{
      display: flex;
      flex-direction: column;
      align-items: center;
      & > div:first-child{
        font-size: 1.4rem;
        font-weight: 600;
      }
    }
  }
`
const ButtonRaport = styled.button`
    grid-row: 6 / 7;

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

export default function Home() {
  useLoginAccess();
  const {token, loading} = useContext(UserContext);
  const { data } = useGetStreak(token, loading);

  return (
    <Container>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      </Head>
      <Header>
        <img src="" alt="logo"/>
        <span>App name</span>
      </Header>
      <ChartBox>
        <div>
          <Chart className={''}/>
        </div>
        <div>
            <div>
              <div>{data?.point}</div>
              <div>points</div>
            </div>
            <div>
              <div>{data?.streak}</div>
              <div>days</div>
            </div>
        </div>
      </ChartBox>

      <ButtonRaport>
        <Link href='/raport'><span>new raport</span></Link>
      </ButtonRaport>
    <Navbar/>
    </Container>
  )
}
