import {  useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'
import { useState } from 'react'

const questions=[{
    name: "Did you eat fast food today?",
    type: "closed",
    answers:[
        "no",
        "yes",
        "yes - lots of",
    ]
},{
    name: "Did you eat salty snacks today?",
    type: "closed",
    answers:[
        "no",
        "yes",
        "yes - lots of",
    ]
},{
    name: "Did you eat sweet snacks today?",
    type: "closed",
    answers:[
        "no",
        "yes",
        "yes - lots of",
    ]
},{
    name: "What was your physical activity like today?",
    type: "closed",
    answers:[
        "almost none",
        "light workout",
        "decent workout",
    ]
},{
    name: "What you were drinking mostly?",
    type: "closed",
    answers:[
        "Juice",
        "Cola etc",
        "Energy drinks",
        "Water",
        "Coffe, tea"
    ]
},{
    name: "Did you eat fruits or vegetables?",
    type: "closed",
    answers:[
        "yes",
        "no",
    ]
}
];

const useRaport =  (token: string) =>{

    const [answers, setAnswers] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [done, setDone] = useState(false);


    const [mutate, {isLoading, isError, isSuccess}] = useMutation((data: any[])=>
    fetch(ENDPOINT+'/TODOE', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({
            'data': data,
        })
    }).then(res=>{
        if(Math.floor(res.status/100) === 4) throw new Error(res.status+'');
        else return res.json();
    }))

    const handleClick = (index: number) =>{
        setAnswers([...answers, index]);
        if( questionNumber+1 < questions.length ){
            setTimeout(()=>setQuestionNumber(o=>o+1), 100);
        }
        else{
            setDone(true);
            mutate(answers);
            setTimeout(()=>setQuestionNumber(o=>o+1), 100);
        }
    }

    return {
        isSuccess,
        questions,
        questionNumber,
        handleClick,
        done
    }
}

export default useRaport;