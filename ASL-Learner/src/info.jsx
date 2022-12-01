import React from "react";
import './info.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Info (){

    const navigate = useNavigate();

    const navigateChooselevel = () =>{
        navigate('/level');
    }

    const navigateGame= () =>{
        navigate('/game');
    }

    const navigateLogin= () =>{
        navigate('/Login');
    }

    async function scores(score){
        const body = {
            score
        }
        const res = await axios ({
            method: 'PATCH',
            url: 'http://localhost:5000/word',
            data: body,
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        results.push(res.data['score'])
    }

    const users = [
        {id: 1, email: 'asama@gmail.com', password: 'L1ven@me', score: 2},
        //{id: 2, email: 'jacob122@gmail.com', password: 'P@ssw0rd', score: 2},
        //{id: 3, email: 'jessica1334@gmail.com', password: 'N@mes123', score: 2},
    ]

    const results = []

    users.forEach(user => {
        results.push(
            <div key={user.id}>
                <table>
                
                    <tr>
                        <td> <h4>Email: </h4></td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td> <h4>Password:</h4> </td>
                        <td>{user.password}</td>
                    </tr>
                    <tr>
                        <td> <h4>Score:</h4> </td>
                        <td>{user.score}</td>
                    </tr>
                
                </table>
                
            </div>
        );
    });



    return (
            <div className="info">
                <h1 className="top"> User Info</h1>
                <div className="contents">
                        {results}

                        <button onClick={navigateChooselevel} class="button-90" role="button">Level Page</button>
                       
                        <button onClick={navigateGame} class="button-90" role="button">Game Page</button>
                        
                        <button onClick={navigateLogin} class="button-90" role="button">Login Page</button>
                    
                </div>
            </div>
        
    );
}

export default Info;