import React, { useEffect,useState } from "react";
import Webcam from 'webcam-easy';
import './game.css'
import axios from 'axios';
import {useLocation,useNavigate} from 'react-router-dom'
// import img from './asl_letters/Sign_language_A.svg';

function Game(){
    const {state} = useLocation();
    const { word,level,username,password,hand } = state;
    // const { word} = state;
    const imgRef = React.useRef();
    const [count,setCount] = useState(0)
    const navigate = useNavigate();


    useEffect( () => {
        console.log(word)
        const webcamElement = document.getElementById('webcam');
        const canvasElement = document.getElementById('canvas');
        const webcam = new Webcam(webcamElement, 'user', canvasElement)
        console.log(webcamElement.getBoundingClientRect())
        const dim = webcamElement.getBoundingClientRect()
        const x = dim.x
        const y = dim.y
        const WIDTH = dim.width
        const HEIGHT = dim.height
        console.log(x)
        console.log(y)

        let intervalID
        webcam.start()
        .then( () => {
            intervalID = setInterval( () =>{
                let picture = webcam.snap()

                const image = new Image()
                image.src = picture

                const ctx = canvasElement.getContext("2d");
                ctx.drawImage(image,0,0)
                let imgData = ctx.getImageData(0,0,WIDTH,HEIGHT).data
                runModel(Array.prototype.slice.call(imgData),Math.floor(HEIGHT),Math.floor(WIDTH))
            },2000)
        })
        if (imgRef.current){
            imgRef.current.src = require(`./asl_letters/Sign_language_${word[0]}.svg`)      
        }
        return() => {
            console.log('closed')
            clearInterval(intervalID)
        }
    },[])

    async function changeLetter(){
        console.log(count)
        if (count < word.length){
            let curr =count + 1
            setCount(count+1)
            const el = document.getElementById(curr)
            console.log(el)
            const letter = el.innerHTML
            console.log(letter)
            imgRef.current.src = require(`./asl_letters/Sign_language_${letter}.svg`)
        }else{
            //update
            if (username !== null){
                const str_word = word.join('')
                const body = {
                    level,
                    word:str_word,
                    email:username,
                    score:100
                }
                await axios({
                    method: 'patch',
                    url: 'http://localhost:5000/word',
                    data: body,
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                })
            }
            //navigate
            navigate('/level',{state :{username,password}});
        }
        
    }

    //toggle
    function toggle(){
        const el = document.getElementById('toggle')
        if (el.checked){
            imgRef.current.style.display = 'none'
        }else{
            imgRef.current.style.display = 'block'
        }
    }
    //send request
    async function runModel(data,height,width){
        // console.log(username)
        // console.log(word[count])
        console.log(hand)
        const body = {
            data,
            height,
            width,
            letter:word[count],
            hand
        }
        const res = await axios({
            method: 'post',
            url: 'http://localhost:5000/',
            data: body,
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        const el = document.getElementById('percentage')
        if (el){
            el.innerText =  Math.round(res.data.value * 100) / 100 + '%'            
        }
        console.log(res.data)
        console.log(word[count])
        if (res.data.letter.toUpperCase() == word[count]){
            changeLetter()
        }
        console.log(res.data)
    }
    return (
        <div className='gamepage'>
            <div className='leftSide'>
                <div className='leftSideContent'>
                    <img id='img' ref={imgRef}></img>
                    <div className='choosenWord'>
                        {word.map( (letter,i) =>{
                            return (
                                <div id={i} className={`letter ${count === i && 'choosenLetter'}`}>{letter}</div>
                            )
                        })}
                        {/* <div id='0' className={`letter ${count === 0 && 'choosenLetter'}`}>C</div>
                        <div id='1' className={`letter ${count === 1 && 'choosenLetter'}`}>L</div>
                        <div id='2' className={`letter ${count === 2 && 'choosenLetter'}`}>O</div>
                        <div id='3' className={`letter ${count === 3 && 'choosenLetter'}`}>S</div>
                        <div id='4' className={`letter ${count === 4 && 'choosenLetter'}`}>E</div> */}
                    </div>
                </div>
                <div id='percentage' className="percent">0%</div>
            </div>
            <div className='toggle'>
                <label class="switch" >
                    <input id='toggle' type="checkbox" onClick={toggle} />
                    <span className="slider round"></span>
                </label>
            </div>
            <div>
                <video id="webcam" className='webcam'></video>
                <canvas id="canvas" className="d-none"></canvas>
            </div>
        </div> 
    )
}
export default Game;