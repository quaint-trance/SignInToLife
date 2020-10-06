import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import useLoginAccess from '../hooks/useLoginAccess'

export default function Home() {
  useLoginAccess();
  return (
    <div >
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      </Head>
        <h1>
          Home
        </h1>
        <Navbar />
    </div>
  )
}
