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
        const webcamElement = document.getElementById('webcam');
        const canvasElement = document.getElementById('canvas');
        const webcam = new Webcam(webcamElement, 'user', canvasElement)
        const dim = webcamElement.getBoundingClientRect()
        const x = dim.x
        const y = dim.y
        const WIDTH = dim.width
        const HEIGHT = dim.height

        let intervalID
        webcam.start()
        .then( () => {
            let curr = 0
            intervalID = setInterval( async () =>{
                let picture = webcam.snap()
                
                const image = new Image()
                image.src = picture

                const ctx = canvasElement.getContext("2d");
                ctx.drawImage(image,0,0)
                let imgData = ctx.getImageData(0,0,WIDTH,HEIGHT).data
                let res = await runModel(Array.prototype.slice.call(imgData),Math.floor(HEIGHT),Math.floor(WIDTH),curr)
                if (res ){
                    curr += 1
                }
            },3000)
        })
        if (imgRef.current){
            imgRef.current.src = require(`./asl_letters/Sign_language_${word[0]}.svg`)      
        }
        return() => {
            clearInterval(intervalID)
        }
    },[])

    async function changeLetter(count){
        if (count < word.length-1){
            let curr = count + 1
            setCount(curr)
            const el = document.getElementById(curr)
            if (el){
                const letter = el.innerHTML
                imgRef.current.src = require(`./asl_letters/Sign_language_${letter}.svg`)
            }
        }else{
            //update
            console.log(username)
            if (username !== null){
                const str_word = word.join('')
                console.log(str_word)
                const body = {
                    level,
                    word:str_word,
                    email:username,
                    score:100
                }
                axios({
                    method: 'patch',
                    url: 'http://localhost:5000/words',
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
    async function runModel(data,height,width,count){
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
        if (res.data.letter.toUpperCase() == word[count]){
            changeLetter(count)
            return true
        }
        return false
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