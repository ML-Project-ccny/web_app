import React from "react";
import './home.css';
import './project.css';
import {useRef, useEffect, useState} from "react"


function Project(){


    //var letters = ['A', 'B', 'C'];
    

    const videoRef = useRef(null);
	
	//const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: {width: 1920, height: 1080}})
			.then (stream => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch(err => {
				console.error(err);
			})

	}

	useEffect(() => {
		getVideo();
	}, [videoRef])


   /*  let webcamButton = document.querySelector('#TurnOnWebcam')
    let video = document.querySelector('#videoElement')

    webcamButton.addEventListener('click',() => {
        if (navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia( { video:true} )
                .then( function (stream) {
                    video.srcObject = stream
                })
                .catch( (err) => console.log( err ))
        }else{
            console.log("not working")
        }
    }) */
    
    //const changeImage = (fileName) => {
        //let img = document.querySelector("#bannerImage");
        //img.setAtrribute(src, fileName);
    //}

   /*  const changeImage = () => {
        let displayimg = document.getElementById('image1')
        if (displayimg.src.match(pic1)) {
            displayimg.src = pic2
        } 
        else if (displayimg.src.match(pic2)) {
            displayimg.src = pic3
        } 
        else if (displayimg.src.match(pic3)) {
            displayimg.src = pic4
        } 
        else{
            displayimg.src = pic1
        } 
    } 
 */

    const pic1 = require("./images/a.jpg");
    const pic2 = require("./images/p.jpg");
    //const pic3 = require("./images/l.jpg");
    //const pic4 = require("./images/e.jpg");

    //const images = {pic1,pic2,pic3,pic4};
    const[img, setImg] = useState(false);

    const imgChangeHandler = () => {
        if(!img) {
            setImg(true);
        }else{
            setImg(false)
        }
    };


    return (
        <div>
            <div id="output">
                {/* <img src={pic1} height="355px" weight="520px" alt="a" id="bannerImage"/> <br/>
                <button onClick={<img src={pic1} height="355px" weight="520px" alt="a" id="bannerImage"/>}> first letter </button>
                <button onClick={<img src={pic2} height="355px" weight="520px" alt="a" id="bannerImage"/>}> second letter </button>
                <button onClick={<img src={pic2} height="355px" weight="520px" alt="a" id="bannerImage"/>}> third letter </button>
                <button onClick={<img src={pic3} height="355px" weight="520px" alt="a" id="bannerImage"/>}> fourth letter </button>
                <button onClick={<img src={pic4} height="355px" weight="520px" alt="a" id="bannerImage"/>}> fifth letter </button> */}
                
                {/* <img id="image1" src={pic1} alt="" onClick={changeImage}/>
                <button onClick={changeImage} id="image1"> 1</button> */}

                {<img src={!img ? pic1 : pic2} width="360px" height="680px" alt='pic1' onClick={imgChangeHandler}/>}

            </div> 

            <div id="camera">
                
                    <video id="videoElement" ref={videoRef}></video>
                
            </div>

            <div id="name">
                <h1> Word: app</h1>
            </div>

        </div>
                    
            
    
    )
}

export default Project;