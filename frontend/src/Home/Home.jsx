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
return(
    <div className="title">


 <div className="nav1">
<div className="nava">Indiamart</div>
<div className="nava">
<input className="navax" type="search" placeholder="search on Indiamart"></input>
</div>
<div className="nava">
<button className='link1' onClick={handlesubmit1}>login
      </button>
</div>
<div className="nava">cart</div>
</div>
<div className="nav2">
<div className="nava">all</div>
<div className="nava">menu</div>
<div className="nava">best deals</div>
</div>

<div className="nav3">
<div className="navc">name</div>
<div className="navc">phone number</div>
<div className="navc">gmail</div>
</div>
<div className="nav4">
queries?
</div>


</div>
)
}
export default Home