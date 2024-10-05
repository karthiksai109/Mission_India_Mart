import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import final from "../Final/final";
import './register.css'
import '../App.css';

function Register(){
  const Navigate=useNavigate()
  const [user,setUser]=useState({
    fname:'',
    lname:'',
    email:'',
    password:'',
    address:''
    
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
  const {fname,lname,email,password,address}=user
  const res=await fetch('http://localhost:3000/register',{
    method:'POST',
    headers:{
      'Content-Type':"application/json",
    },
    body:JSON.stringify({
      fname,lname,email,password,address
    })
  })

  var data=await res.json()
  console.log(data)
  let Imparr=['fname','lname','email','password','address']

  if(data.status===false && data.message=="First name must be in string" ){
    window.alert(`please enter valid firstname`)
    Navigate('/register')
}
else if(data.status===false && data.message=="First name is required." ){
  window.alert(`please enter valid firstname`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Enter a valid First name" ){
  window.alert(`please enter valid firstname`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Last name must be in string"){
  window.alert(`please enter lastname `)
  Navigate('/register')
}
else if(data.status===false && data.message=="Last name is required."){
  window.alert(`please enter valid lastname `)
  Navigate('/register')
}
else if(data.status===false && data.message=="Enter a valid Last name." ){
  window.alert(`please enter valid lastname `)
  Navigate('/register')
}
else if(data.status===false && data.message=="Email must be in String."){
  window.alert(`please enter valid email`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Email is required."){
  window.alert(`please enter valid email`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Enter a valid Email."){
  window.alert(`please enter valid email`)
  Navigate('/register')
}
else if(data.status===false && data.message=="This Email is already in use, try with another one."){
  window.alert(`This Email is already in use, try with another one.`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Password must be in string"){
  window.alert(`Password must be in string"`)
  Navigate('/register')
}
else if(data.status===false && data.message=="password is required."){
  window.alert(`password is required.`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Password Must be 8-15 length,consist of mixed character and special character"){
  window.alert(`Password Must be 8-15 length,consist of mixed character and special character`)
  Navigate('/register')
}
else if(data.status===false && data.message=="Address is required."){
    window.alert(`please enter your address`)
    Navigate('/register')
  }
else{
  
  window.alert(`response saved successfully , Thank you!`)
  Navigate('/Home')
}
  }



  return (
    <div className="outer">
    <h2 id='heading'>India Mart</h2>
      <div className="title_sign">
      <div id='h3'>
      <h3>Register</h3>
      </div>
  <div className='App-register' style={{backgroundColor:"white"}}>
  <form method="POST" className="register-Form" id="register-Form">

  <div className="name-feild">
  <h4>your firstname</h4>
  <input type="text" name="fname" id="fname" value={user.fname} onChange={handleInputs}  placeholder="enter your firstname"/>
  </div>
  <h4>your lastname</h4>
  <div className="name-feild">
  <input type="text" name="lname" id="lname" value={user.lname} onChange={handleInputs} placeholder="enter your lastname"/>
  </div>
  <div className="email-feild">
  <h4>email</h4>
  <input type="email" name="email" id="email" value={user.email} onChange={handleInputs}  placeholder="enter your emailaddress"/>
  </div>
  <div className="password-feild">
  <h4>create password</h4>
  <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder="create your password"/>
  </div>

  <div className="password-feild">
  
  <h4>address</h4>
  <input type="text" name="address" id="address" value={user.address} onChange={handleInputs}  placeholder="enter your address"/>
  </div>
  
  
  </form>
  
  <button className='link' onClick={postData}>submit
  </button>
 
  </div>

  </div>
  </div>
  
  )

}
export default Register
  

