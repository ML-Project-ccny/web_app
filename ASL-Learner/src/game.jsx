import React, { useEffect,useState } from "react";
import Webcam from 'webcam-easy';
import './game.css'
import img1 from './asl_letters/Sign_language_A.svg';
function Game(){
    
    useEffect( () => {
        const webcamElement = document.getElementById('webcam');
        const canvasElement = document.getElementById('canvas');
        const webcam = new Webcam(webcamElement, 'user', canvasElement)
        webcam.start()
    })
    return (
        <div className='gamepage'>
            <div className='leftSide'>
                <div className='leftSideContent'>
                    <img src={img1}></img>
                    <div className='choosenWord'>
                        <div className='letter'>C</div>
                        <div className='letter choosenLetter'>L</div>
                        <div className='letter'>O</div>
                        <div className='letter'>S</div>
                        <div className='letter'>E</div>
                    </div>
                </div>

            </div>
            <div>
                <video id="webcam" className='webcam'></video>
                <canvas id="canvas" className="d-none"></canvas>
            </div>
        </div> 
    )
}
export default Game;