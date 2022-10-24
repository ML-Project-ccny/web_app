import React from "react";
import './home.css';
import './project.css';
import {useRef, useEffect} from "react"




function Project(){


    var letters = ['A', 'B', 'C'];
    

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



    return (
        <div>
            <div id="output">
                <h1>
                    {letters.map(function(name, index){
                        return <h1><li key={ index }>{name}</li></h1>;
                    })}
                </h1>
            </div> 

            <div id="camera">
                
                    <video id="videoElement" ref={videoRef}></video>
                
            </div>
        </div>
                    
            
    
    )
}

export default Project;