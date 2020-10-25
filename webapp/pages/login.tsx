import Head from 'next/head'
import Link from 'next/link'
import useLogin from '../hooks/useLogin'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext'
import { useRouter } from 'next/router'
import Button from '../components/Button'
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

const Main = styled.main`
  display: grid;
  grid-template-rows: 2fr auto 4fr auto .5fr;
  min-height: 100vh;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 8s infinite;
  color: white;
`

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row: 2 / 3;
  padding: 20px;
  text-align: center;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  grid-row: 4 / 5;

  & > input{
    outline: 'none';
    border-radius: 10px;
    border: 2px solid ${({error}: {error: boolean}) => error ? `red` : `white`};
    margin: 0 0 30px 0;
    font-size: 1.2rem;
    padding: 10px;
  }

  & > label{
      color: ${({error}: {error: boolean}) => error ? `red` : `white`}
    }
`
const LoginButton = styled.button`
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

const Logo = styled.img`
  width: 70%;
`

export default function Login() {
  
    const { singin, isLoading, isError, isSuccess, responseToken } = useLogin();
    const {setToken, token, loading} = useContext(UserContext);
    const router = useRouter();

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        singin(event.target.email.value, event.target.pass.value);
    }

    useEffect(()=>{
        if(responseToken) setToken(responseToken);
    }, [responseToken]);

    useEffect(()=>{
      if(loading) return;
      if(token) {
        router.push('/home');
      }
    }, [token, loading])

    return (
    <Main>
      <Head>
        <title>Sign in to Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Logo src="/logo.png" alt="logo"/>
      </Header>
      <Form onSubmit={handleFormSubmit} error={isError} autoComplete="off">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" autoComplete="off" />
          <label htmlFor="pass">Password</label >
          <input type="password" name="pass" id="pass" autoComplete="off" />
          <LoginButton onClick={()=>{}}> <span>Sign in</span></LoginButton>
          <Link href='/register'>Don't have an account?</Link>
      </Form>
    </Main>
  )
}