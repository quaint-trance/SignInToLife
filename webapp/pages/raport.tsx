import Head from 'next/head'
import styles from '../styles/Raport.module.css'
import useLoginAccess from '../hooks/useLoginAccess'
import { Close } from '@material-ui/icons'
import {useState} from 'react'
import { animated, useSpring } from 'react-spring'

const questions=[{
    name: "What is heheeh?",
    type: "closed",
    answers:[
        "HTML file really",
        "easy to understand",
        "the expressiveness",
        "This is a type of file"
    ]
},{
    name: "What is uhuhuh?",
    type: "closed",
    answers:[
        "HTML file really",
        "This is a type of file",
        "the expressiveness",
        "easy to understand", 
    ]
}
];

export default function Home() {
    useLoginAccess();
    const [questionNumber, setQuestionNumber] = useState(0);
    const progressBarProps = useSpring({width: `${100*questionNumber/questions.length}%`})

    return (
        <div className={styles.container}>
            <Head>
            <title>Map</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <meta lang="en"></meta>
            </Head>
            <div className={styles.header}>
                <Close />
                <div className={styles.progressBar}>
                    <animated.div style={progressBarProps}></animated.div>
                </div>
            </div>
            <main className={styles.main}>
                <div className={styles.name}>{ questions[questionNumber].name }</div>
                <div className={styles.answers}>
                    {questions[questionNumber].answers.map((el, index)=>(
                        <div onClick={()=>setQuestionNumber(o=>o+1)}>{el}</div>
                    ))}
                </div>
            </main>
        </div>
  )
}
