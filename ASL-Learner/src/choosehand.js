import React from "react";
import './home.css';
import { Container, Form, Button, ButtonGroup } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';


function Choosehand() {
    
    const navigate = useNavigate();

    const navigateWebcam = () =>{
        navigate('/webcams');
    }
    
    return (
        <div>
            <div class="containers">
                <Container>
                    <Form className = "text-center">
                        <h1> <bold> Are you left or right handed? </bold> </h1>
                        <h6> Choose the hand you want to use </h6>
                        <ButtonGroup vertical>
                            <Button onClick={navigateWebcam}> Right </Button>
                            <Button onClick={navigateWebcam}> Left </Button>
                            
                        </ButtonGroup>   
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default Choosehand;