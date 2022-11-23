import React, { useEffect,useState } from "react";
import Webcam from 'webcam-easy';
import './chooseLevel.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function ChooseLevel(){

    const [level,setLevel] = useState(['Level 1','Level 2','Level 3','Level 4'])
    // const [count,setCount] = useState([8,6,7,6])
    const [words,setWords] = useState()
    const [score,setScore] = useState([
        [],
        [],
        [],
        []
    ])
    const navigate = useNavigate();
    
    useEffect( async () => {
        const res = await axios({
            method: 'get',
            url: 'http://localhost:5000/allWords',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        // if user is signed in 
        //pass

        //else
        console.log(res.data)
        let arrWords = []
        Object.keys(res.data).forEach( (num) =>{
            console.log(res.data[num])
            arrWords.push(res.data[num])
        } )
        // setWords(arrWords)
        // res.data.forEach((i,arr) => {
        //     console.log(res.data[i])
        // })
    },[])

    function changeDisplay(i,j){
        const content = document.getElementById(i)
        const title = document.getElementById(j)
        if (content.style.display === "block") {
            content.style.display = "none";
            title.style.backgroundColor = 'white'
          } else {
            content.style.display = "block";
            title.style.backgroundColor = '#d2dce7'
          }
    } 
    function changeHand(x){
        const content = document.getElementById('dropdown-basic-button')
        if (x === 0){
            content.innerHTML = 'Right'
        }else{
            content.innerHTML = 'Left'
        }

    }

    const navigateGame = () =>{
        navigate('/game');
    }
    // useEffect( () => {
    //     const webcamElement = document.getElementById('webcam');
    //     const canvasElement = document.getElementById('canvas');
    //     const webcam = new Webcam()   
    //     webcam.start()
    // },[])
    return (
        <div>
            <div className='hand'>
                <h4 className='question'>  Are you left or right handed? </h4>
                <DropdownButton className='dropDown' id="dropdown-basic-button" title="Hand ">
                    <Dropdown.Item onClick={() => changeHand(0)}>Right</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeHand(1)}  href="#/action-2">Left</Dropdown.Item>
                </DropdownButton>
                {/* <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button className="nav-link deactive" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                    </li>
                </ul> */}
            </div>
            <div className='level'>
                <div id='1title' onClick={() => changeDisplay(1,'1title')} className='title'>
                    <h4>Level 1</h4>
                    <div className="rightTitle">
                        <p className='score'> (6 / 8)</p>
                        <div className='grayBar'> 
                            <div className='colorBar'></div>
                        </div>
                    </div>

                </div>
                
                <div id ='1' className='words'>
                    <h4 onClick={navigateGame} className='word'><span>word 1</span></h4>
                    <h4 className='word'><span>word 1</span></h4>
                    <h4 className='word'><span>word 1</span></h4>
                    <h4 className='word'><span>word 1</span></h4>
                </div>
            </div>

            {/* { level.map( (val,i) =>{
                return(
                    <div> 
                        <span>val</span>
                        <span>score</span>
                        <div>
                        {score[i].map( (val,i) => {
                            return(
                                <div>val</div>
                            )
                        })}
                        </div>

                    </div>)
            })}  */}
        </div>
    )
}

export default ChooseLevel;