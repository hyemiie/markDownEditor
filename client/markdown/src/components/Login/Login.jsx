import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

            alert('Login Successful')
            navigate('/mainpage')

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen flex p-24  bg-slate-500">
            <div className="w-1/2 bg-gradient-to-r from-cyan-600 to-slate-300 flex justify-center items-center p-10">
                <div className="text-white text-center">
                    <h1 className="text-3xl font-semibold mb-4">Welcome Back!</h1>
                    <p className="text-lg mb-4">Login to access your account</p>
                    <p className="text-sm">Don't have an account yet? 
                    <ul>
        <li className='underline'>
       
            <a href="/Register" className="underline">
               Register here
            </a>
         
        {/* <Link to="/about">Sign up here</Link> */}
        </li>
    </ul></p>
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <form className="w-3/4 bg-slate-500 shadow-md rounded px-8 py-8">
                    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
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
