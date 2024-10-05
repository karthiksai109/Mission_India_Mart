import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Home from "../Home/Home";
import '../App.css';

function Final() {
        const Navigate=useNavigate()
        function handlesubmit(){
          Navigate('/')
        }
  return (
<div>
  <h1>Thank you</h1>  

  </div>
  
  )

}
export default Final


