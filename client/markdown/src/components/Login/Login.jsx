import axios from 'axios'
import React from 'react'

const Login = () => {

    const Login = async(e)=>{
        e.preventDefault()
        const userMail= document.getElementById('email').value;
        const password= document.getElementById('password').value;

        const data = {
            userMail, password
        }
        console.log(data)

        try{

        
const response = axios.post('http://localhost:5000/login', data )
    }
    catch(error){
console.log(error)
    }
    }
  return (
    <div>
        <form>
        <h1>Login</h1>
            <input placeholder="Email" type='email' id='email'/>
            <input placeholder="Password" type='password' id='password'/>
<button onClick={Login}>Login</button>
        </form>
    </div>
  )
}

export default Login