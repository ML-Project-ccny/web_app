import React from 'react';
import './App.css';
import Home from './home';
import About from './about';
import Project from './project';
import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Choosehand from './choosehand';
import Webcams from './webcams';
import ChooseLevel from './chooseLevel'
import Game from './game'
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
        <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path= "/choosehand" element={<Choosehand />}/>
        <Route path= "/webcams" element = {<Webcams />}/>
        <Route path="/project" element={<Project />} />
        <Route path="/level" element={<ChooseLevel />} />
        <Route path="/game" element={<Game />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
