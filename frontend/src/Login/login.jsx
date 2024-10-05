import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Register from "../register/register";
import Home from "../Home/Home";
import './Login.css'


function Login(){
    const Navigate=useNavigate()
  const [user,setUser]=useState({
    email:'',
    password:'',
})
let name,value
const handleInputs=(e)=>{
  console.log(e)
    name=e.target.name
    value=e.target.value
    setUser({...user,[name]:value})
}
const postData=async(e)=>{
  e.preventDefault();
  const {email,password}=user
  const res=await fetch('http://localhost:3000/login',{
    method:'POST',
    headers:{
      'Content-Type':"application/json",
    },
    body:JSON.stringify({
      email,password
    })
  })

  var data=await res.json()
  console.log(data)
  let Imparr=['email','password']

 


if(data.status===false && data.message=="email must be in String."){
  window.alert(`please enter valid email`)
  Navigate('/Login')
}
else if(data.status===false && data.message=="Email is mandatory and can not be empty."){
  window.alert(`please enter valid email`)
  Navigate('/Login')
}


else if(data.status===false && data.message=="password must be in string"){
  window.alert(`Password must be in string"`)
  Navigate('/Login')
}
else if(data.status===false && data.message=="Password is mandatory and can not be empty."){
  window.alert(`password is required.`)
  Navigate('/Login')
}
else if(data.status===false && data.message=="No such user exist. Please Enter a valid Email and Passowrd."){
  window.alert(`No such user exist. Please Enter a valid Email and Passowrd.`)
  Navigate('/Login')
}
else if(data.status===false && data.message=="please provide correct credentials , Password is incorrect."){
    window.alert(`please provide correct credentials , Password is incorrect.`)
    Navigate('/Login')
  }
else{
  
  window.alert(`register found`)
  Navigate('/Home')
}
  }
  return (
    <div>
    <h2 id='header'>India Mart</h2> 
      <div className="title_signin">
   
   <div className="border_signin">
   <div className="s">
   <h3>Sign in</h3>
   <h4>Email</h4>
   <div className="input">
   <input type="email" name="email" value={user.email} onChange={handleInputs} id="email"/>
   </div>
   <h4>Password</h4>
   <div className="input">
   <input type="password" name="password" value={user.password} onChange={handleInputs} id="password"/>
   </div>
   <div className="b" >

   <button id="btn" onClick={postData}  >continue</button>
 
   </div>
   </div>

   </div>
        
  
  </div>
  </div>
  )

}

export default Login
  

