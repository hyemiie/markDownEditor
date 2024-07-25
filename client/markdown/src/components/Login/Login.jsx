import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import heroGIF from "../../Images/heroImage.gif";
import './Login.css'
import Navbar from '../NavBar/Navbar';


const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userMail = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            userMail,
            password
        };

        try {
            const response = await axios.post('http://localhost:5000/login', data);
            console.log("response", response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('currentUser', response.data.userName);

            alert('Login Successful')
            navigate('/mainpage')


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col bg-white min-h-screen">
        {/* <Navbar/> */}
        <div className="h-[1%]">
        <Navbar />
      </div>
            {/* <div className="w-1/2 bg-gradient-to-r from-cyan-600 to-slate-300 flex justify-center items-center p-10">
                <div className="text-white text-center">
                    <h1 className="text-3xl font-semibold mb-4">Welcome Back!</h1>
                    <p className="text-lg mb-4">Login to access your account</p>
                    <p className="text-sm">Don't have an account yet? 
                    <ul>
        <h3 className='underline'>
       
            <a href="/Register" className="underline">
               Register here
            </a>
         
        </h3>
    </ul></p>
                </div>
            </div> */}

            {/* <div className='w-[50%]'><img src={heroGIF}></img></div> */}
            <div className="w-[100%] flex justify-center items-center pt-20 bg-white h-[85vh] ">
                <form className="  w-[80%]">
                    <h1 className="text-3xl font-semibold text-left mb-6 font-light">Login</h1>
                    <div className="mb-4">
                        <input
                            className="   w-full p-6 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid font-mono"
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="   w-full p-6 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid font-mono"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-12"
                            type="submit"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
