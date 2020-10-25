import Head from 'next/head'
import Navbar from '../components/Navbar'
import useLoginAccess from '../hooks/useLoginAccess'
import { useContext } from 'react'
import useRanking from '../hooks/useRanking'
import { UserContext } from '../components/UserContext'
import { ImDiamonds } from 'react-icons/im'
import { useTransition, animated } from 'react-spring'
import styled, { keyframes } from 'styled-components';

const leaguesNames = ['Bronze', 'Silver', 'Gold','Emerald', 'Diamond'];
const leaguesColors = ['#bd6628', '#d1d1d1', '#edda05', '#34ed41', '#34b7eb']

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
  grid-template-rows: auto 1fr;
  height: 100vh;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 8s infinite;
  overflow-y: hidden;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8vh 10px 8vh 10px;
  text-align: center;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 10px 20px 10px;

  & > div{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
  & > h1{
    margin: 0px;
    margin-top: 0px;
  }
  & > span{
    color: #ee561a;
    font-weight: 900;
    font-size: 1rem;
    margin: none;
  }
`
const Diamond = styled.div`
  font-size: ${({active}:{active: boolean})=> active? '4rem' : '1.5rem'};
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`
const List = styled.div`
  padding-top: 10px;
  padding-bottom: 100px;

  & > div{
    background-color: white;
    border-radius: 10px;
    margin: 30px 10px;
    display: grid;
    grid-template-columns: 20px 1fr 50px;
    font-size: 1.3rem;
    padding: 15px;

    & > div{
      display: flex;
      align-items: center;
    }

    & > div:nth-of-type(1){
        color: #999898;
        font-size: 1rem;
        justify-content: center;
    }
    & > div:nth-of-type(2){
        padding-left: 10px;
    }
    & > div:nth-of-type(3){
        justify-content: flex-end;
    }
  }

`

export default function Ranking() {

  useLoginAccess();
  const {token, loading} = useContext(UserContext);
  const {isLoading, data} = useRanking(token, loading);

  const leaderboardTransition = useTransition(data?.leaderboard, el => `${el._id}${el.id}`, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config:{duration: 1000*.5},
      
  })

  return (
    <Container >
      <Head>
        <title>Ranking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <div>
          {leaguesNames.map((name, index)=>
              <Diamond
              key={index}
              style={{color: leaguesColors[index]}}
              active={index===data?.level}
              >
                <ImDiamonds/>
              </Diamond>
          )}
          </div>
          <h1>
            {data.level >= 0 && `${leaguesNames[data?.level]} League`}
          </h1>
          <span>{data.level >= 0 && `ends in ${data?.ends?.getDate()-1}d ${data?.ends?.getHours()}h ${data?.ends?.getMinutes()}m ${data?.ends?.getSeconds()}s`}</span>
      </Header>
      <Main >
        {data.level === -2 && <div >
          You are not in any league currently. Compelte a daily report to be assigned.
        </div> }
        <List>
          {leaderboardTransition.map(({item, props, key}, index)=>
            <animated.div key={key}> 
                <div>{index+1}</div>
                <div> {item?.name}</div>
                <div>{item?.score}</div>
            </animated.div>
          )}
        </List>
      </Main>
      <Navbar />
    </Container>
  )
}
