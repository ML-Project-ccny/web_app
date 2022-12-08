import React , {useEffect, useState}from "react";
import './info.css';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Info (){

    const {state} = useLocation();
    const {email, password, word, level, hand} = state
    const [wordarr,setWordarr] = useState([])
    const [result,setResult] = useState()

    useEffect( () => {
        scores()
    },[])

    const navigate = useNavigate();
    

    const navigateChooselevel = () =>{
        navigate('/level',{state:{username:email, password}});
    }

    const navigateLogin= () =>{
        navigate('/Login');
    }

    async function scores(){
        let arrWords = []
        const body = {
            email
        }
        const res = await axios ({
            method: 'POST',
            url: 'http://localhost:5000/words',
            data: body,
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        console.log(res.data)
        Object.keys(res.data).forEach( (arr) =>{
            console.log(res.data[arr])
            arrWords.push(res.data[arr])
        } )
        console.log(arrWords)
        setWordarr(arrWords)

        let result_= 0

        arrWords.map((arr, i) => {
            arr.map ((w) => {
                result_ = result_ + w[1] 
            })
            setResult(result_)
        })

    }


    return (
            <div className="info">
                <h1 className="top"> User Info </h1>
                
                <div className="contents">
                       
                        {wordarr.map((arr, i) => {
                            if (email){
                                return(
                                    <div>
                                        <table>
                                            <tr>
                                                <td> <h4>Level:</h4> </td>
                                                <td>{i+1}</td>
                                            </tr>
                                            <tr>
                                                <td> <h4>Score:</h4> </td>
                                                {/* <td>{result}</td> */}
                                                <td>{arr.map((w) => {
                                                    return (
                                                        <div>{w[0]} : {w[1]}</div>
                                                    )
                                                })}</td>
                                            </tr> 
                                        </table>
                                    </div>
                                )
                            }
                        })}

                        <button class="button-90" >Username: {email}</button>
                        <button onClick={navigateChooselevel} class="button-90" role="button">Level Page</button>
                       
                        <button onClick={navigateLogin} class="button-90" role="button">Log Out</button>

                        
                        
                    
                </div>
            </div>
        
    );
}

export default Info;