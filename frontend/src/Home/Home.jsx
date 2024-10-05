import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Register from "../register/register";
import Login from "../Login/login";
import '../App.css';
import './Home.css'




function Home(){
  const Navigate=useNavigate()
  function handlesubmit1(){
  Navigate('/Login')

  }
  function handlesubmit2(){
    Navigate('/register')
  
    }
    

return(
    <div className="title">
<h1 color='blue'>welcome to</h1>
      <h2 height='100px' width='200px'>Indiamart</h2>
      <div className="nav1">
      <button className='link' onClick={handlesubmit1}>login
      </button>
      <button className='link' id='link' onClick={handlesubmit2}>signup</button>

 </div>
 <div className="nav1">
<div className="nava">a1</div>
<div className="nava">a2</div>
<div className="nava">a3</div>
<div className="nava">a4</div>
</div>
<div className="nav2">b</div>
<div className="nav3">c</div>
<div className="nav4">d</div>

</div>
)
}
export default Home