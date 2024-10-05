import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import viteLogo from '/vite.svg'
import Home from './Home/Home';
import Final from './Final/final';
import Register from "./register/register"
import Login from './Login/login';

import './App.css'

function App() {
  return (

   
<div>
    <Router>  
    <Routes> 
       <Route path='/' element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/final" element={<Final/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
        
        </Router> 
      

    </div>
  )
}

export default App
