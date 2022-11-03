import React, { useEffect,useState } from "react";
import Webcam from 'webcam-easy';
import './game.css'
import axios from 'axios';
// import img from './asl_letters/Sign_language_A.svg';

function Game(){
    const imgRef = React.useRef();
    const [count,setCount] = useState(0)

    useEffect( () => {
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

        webcam.start()
        .then( () => {
            setInterval( () =>{
                let picture = webcam.snap()
                console.log(picture)

                const image = new Image()
                image.src = picture

                const ctx = canvasElement.getContext("2d");
                ctx.drawImage(image,0,0)
                let imgData = ctx.getImageData(0,0,WIDTH,HEIGHT).data
                console.log(imgData,WIDTH,HEIGHT)
                runModel(Array.prototype.slice.call(imgData),Math.floor(HEIGHT),Math.floor(WIDTH))
            },2000)
        })
        if (imgRef.current){
            imgRef.current.src = require('./asl_letters/Sign_language_C.svg')      
        }
    },[])

    // useEffect( () => {
    //     if (count < 5){
    //         const el = document.getElementById(count)
    //         console.log(el)
    //         const letter = el.innerHTML
    //         console.log(letter)
    //         // imgRef.current.src = require(`./asl_letters/Sign_language_${letter}.svg`)
    //     }
    // },[count])

    function changeLetter(){
        if (count < 5){
            setCount(count+1)
            const el = document.getElementById(count)
            console.log(el)
            const letter = el.innerHTML
            console.log(letter)
            imgRef.current.src = require(`./asl_letters/Sign_language_${letter}.svg`)
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
        changeLetter()
    }
    //send request
    async function runModel(data,height,width){
        const body = {
            data,
            height,
            width
        }
        const res = await axios({
            method: 'post',
            url: 'http://localhost:5000/',
            data: body,
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        if (res.prediction == 'C'){
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
                        <div id='0' className={`letter ${count === 0 && 'choosenLetter'}`}>C</div>
                        <div id='1' className={`letter ${count === 1 && 'choosenLetter'}`}>L</div>
                        <div id='2' className={`letter ${count === 2 && 'choosenLetter'}`}>O</div>
                        <div id='3' className={`letter ${count === 3 && 'choosenLetter'}`}>S</div>
                        <div id='4' className={`letter ${count === 4 && 'choosenLetter'}`}>E</div>
                    </div>
                </div>

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