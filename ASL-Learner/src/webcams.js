import React from "react";
import './home.css';
import './webcam.css';
import { Container, Form, Button} from "react-bootstrap";
import {useRef, useEffect} from "react"
import {useNavigate} from 'react-router-dom';



function Webcams(){

    const navigate = useNavigate();

    const navigateProject = () =>{
        navigate('/project');
    }

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
            <div class="containers">
                <Container>
                    <Form className = "text-center">
                    <div id="container">
                        <video autoplay="true" id="videoElement">
                        </video>
                    </div>
                    <div id="buttonContainer">
                        <Button onClick={navigateProject}> Turn On Webcam </Button>
                    </div>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default Webcams;