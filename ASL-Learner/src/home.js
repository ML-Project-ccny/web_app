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
            <div className='bottomSpace'>
                <button onClick={navigateChoosehand} class="button-9" role="button">Let's Start</button>
            </div>
            <div className='What'>
                <div className='desc'>
                    <h1 className='descTitle'>What is American Sign Language?</h1>
                    <p className='descSumm'> &emsp; American Sign Language (ASL) is a complete, natural language. It has the same
linguistic properties as spoken languages, with grammar that differs from English. By using the
hand and face, it is being expressed. ASL is mostly used for North American people who are
deaf and hard of hearing. Many other countries have their sign languages. Even though most of
the sign languages are similar, they have some differences. American Sign Language (ASL) is a complete, natural language. It has the same
linguistic properties as spoken languages, with grammar that differs from English. By using the
hand and face, it is being expressed. ASL is mostly used for North American people who are
deaf and hard of hearing. Many other countries have their sign languages. Even though most of
the sign languages are similar, they have some differences</p>
                </div>
                <img className='img1' src={img1}></img>
            </div>
            <div className='purpose'>
                <img className='img2' src={img2}></img>
                <div className='desc'>
                        <h1 className='descTitle'>Why ASL Learner</h1>
                        <p className='descSumm'> &emsp; American Sign Language (ASL) is a complete, natural language. It has the same
    linguistic properties as spoken languages, with grammar that differs from English. By using the
    hand and face, it is being expressed. ASL is mostly used for North American people who are
    deaf and hard of hearing. Many other countries have their sign languages. Even though most of
    the sign languages are similar, they have some differences. American Sign Language (ASL) is a complete, natural language. It has the same
    linguistic properties as spoken languages, with grammar that differs from English. By using the
    hand and face, it is being expressed. ASL is mostly used for North American people who are
    deaf and hard of hearing. Many other countries have their sign languages. Even though most of
    the sign languages are similar, they have some differences</p>
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