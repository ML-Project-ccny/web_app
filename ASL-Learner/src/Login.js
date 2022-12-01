import React, { useTransition } from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import AuthContext from "./context/AuthProvider";

import axios from 'axios';
//const LOGIN_URL = '/auth';

const Login = () => {

    const navigate = useNavigate();

    const navigategame = () =>{
        navigate('/level',{state:{username:email,password}});
    }

    //const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    async function login(){
        console.log(email, password)

        const res = await axios({
            method: 'GET',
            url: 'http://localhost:5000/user',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
        if (email === res.data['email'] && password === res.data['password']){
            setSuccess(true)
                
        }
        else{
            setErrMsg('Invalid Information')
        }
    
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        setUser('');
        setPwd('');
        setSuccess(true);
        
    }

    return (
        <>
            {success ? (
                <div className='infos'>
                    <section>
                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <a href='/game'>Go to Game Page</a>
                            <br />
                            <a href='/info'>Go to Info Page</a>
                        </p>
                    </section>
                </div>
            ) : (
                <div className='infos'>
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={email}
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={password}
                                required
                            />
                            <button onClick={navigategame}>Sign In</button>
                        </form>
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                <a href='/Register'>Sign Up</a>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default Login