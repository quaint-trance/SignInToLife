import Head from 'next/head'
import styles from '../styles/Raport.module.css'
import useLoginAccess from '../hooks/useLoginAccess'
import { Close } from '@material-ui/icons'
import {useState} from 'react'
import { animated, useSpring } from 'react-spring'
import { useRouter } from 'next/router'
import useRaport from '../hooks/useRaport'

export default function Raport() {
    const router = useRouter();
    useLoginAccess();
    const { questions, handleClick, questionNumber, done } = useRaport('');
    const progressBarProps = useSpring({width: `${100*questionNumber/questions.length}%`})

    return (
        <div className={styles.container}>
            <Head>
            <title>Ranking</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <meta lang="en"></meta>
            </Head>
            <div className={styles.header}>
                <Close onClick={()=>router.back()}/>
                <div className={styles.progressBar}>
                    <animated.div style={progressBarProps}></animated.div>
                </div>
            </div>

            {!done && <main className={styles.main}>
                <div className={styles.name}>{ questions[questionNumber].name }</div>
                <div className={styles.answers}>
                    {questions[questionNumber].answers.map((el, index)=>(
                        <button
                            className={styles.button}
                            onClick={()=>handleClick(index)}
                            key={index+'-'+questionNumber}
                        >{el}</button>
                    ))}
                </div>
            </main>}
            {done && <main className={styles.done}>
                Done!
            </main>}

        </div>
  )
}
