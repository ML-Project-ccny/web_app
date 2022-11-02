import React from "react";
import './home.css';
import { Container, Form, Button, ButtonGroup } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import img1 from './images/Inked268148-P5GZPM-683.jpg';
import img2 from './images/istockphoto-1364814067-612x612.jpg'
function Home(){

    const navigate = useNavigate();

    const navigateChoosehand = () =>{
        navigate('/level');
    }

    return (
        <div>
            <div className='space'></div>
            <div className='image'>
                
            </div>
            <div className="bottomSpace">
                <h1 className='descTitle1'>L E A R N E R</h1>
            </div>
            <div className='bottomSpace'>
                <button onClick={navigateChoosehand} class="button-9" role="button">Let's Start</button>
            </div>
            <div className='What'>
                <div className='desc'>
                    <h1 className='descTitle'>What is ASL Learner?</h1>
                    <p className='descSumm'> &emsp;We are building an ASL Learner project that that will spell out each letters into a ASL sign to create a fingerspelling. 
                    In this project, we are using the machine learning to guide our users to learn ASL by using hand gestures. 
                    The user will use the webcam to perform a hand gesture based on the designated ASL sign showed on the display. 
                    They will learn how each English letter is transferred into a ASL sign. 
                    They can also use it as a translator where they perform ASL sign that is converted into letter which is converted into sentence
                     </p>
                </div>
                <img className='img1' src={img1}></img>
            </div>
            <div className='purpose'>
                <img className='img2' src={img2}></img>
                <div className='desc'>
                        <h1 className='descTitle'>What is Amarican Sign Language?</h1>
                        <p className='descSumm'> &emsp; American Sign Language (ASL) is a natural language that serves as the 
                    predominant sign language of Deaf communities in the United States of America and most of Anglophone Canada. 
                    ASL is a complete and organized visual language that is expressed by employing both manual and nonmanual features. 
                    Besides North America, dialects of ASL and ASL-based creoles are used in many countries around the world, 
                    including much of West Africa and parts of Southeast Asia. ASL is also widely learned as a second language, serving as a lingua franca. 
                    ASL is most closely related to French Sign Language (LSF). 
                    It has been proposed that ASL is a creole language of LSF, although ASL shows features atypical of creole languages, such as agglutinative morphology.
                    ASL is mostly used for North American people who are deaf and hard of hearing. Many other countries have their sign languages. 
                    Even though most of the sign languages are similar, they have some differences</p>
                    </div>
                
            </div>
            <div className='bottomPage'></div>
            {/* <img src={img1} alt="" width={430} height={730}/>
                <div class="containers">
                    
                    <Container>
                        <Form className = "text-center">
                            <h1> <bold> ASL Learner </bold> </h1>
                            <h6> Learn about ASL with machine learning </h6>
                            <ButtonGroup vertical>
                                <Button onClick={navigateChoosehand}> Let's start </Button>
                            </ButtonGroup>   
                        </Form>
                    </Container>
                </div> */}
        </div>
    )
}

export default Home;