import '../styles/globals.css'
import { AppProps } from 'next/app'
import { UserProvider } from '../components/UserContext'

function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <UserProvider>
      <Component {...pageProps} />
      <html lang="en"></html>
    </UserProvider>
  </>
  )
}

export default App