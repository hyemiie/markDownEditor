import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import heroGIF from "../../Images/heroImage.gif";
import './Login.css'
import Navbar from '../NavBar/Navbar';
import { useState } from 'react';
import CustomAlert from '../CustomAlert/CustomAlert';
import Preloader from '../Preloader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
faEye} from "@fortawesome/free-solid-svg-icons";


const Login = () => {
    const navigate = useNavigate();
    const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordView, setPasswordView] = useState(false);


    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
      };
    
      const handleAlertClose = () => {
        setAlertVisible(false);
        setAlertMessage('');
      }

      const togglePasswordView = () => {
        setPasswordView(!passwordView);
    };


    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token');
        
        // If the token exists, redirect to the main page or another protected route
        if (token) {
            navigate('/mainpage'); // Redirect to your main page or dashboard
        }
    }, [navigate]);

      const handleLogin = async (e) => {
        setLoading(true); // Set loading to true
        e.preventDefault();
        
        const userMail = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const data = {
            userMail,
            password
        };
    
        try {
            const response = await axios.post('https://markdowneditor-backend.onrender.com/login', data);
            console.log("response", response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('currentUser', response.data.userName);
    
            // Keep loading state for 5 seconds (5000 ms) or adjust as needed
            setTimeout(() => {
                setLoading(false);  // Set loading to false after timeout
                showAlert('Logged In');
                navigate('/mainpage');
            }, 5000);  // Adjust this value to control the duration of the loading state
    
        } catch (error) {
            setLoading(false);  // If there's an error, stop loading immediately
            console.log(error);
            showAlert('Login failed');
        }
    };
    

    return (
        <div className="flex flex-col bg-white min-h-screen overflow-hidden">
         {alertVisible && (
        <CustomAlert message={alertMessage} onClose={handleAlertClose} />
      )}
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

            <div className="w-[100%] flex justify-center items-center pt-20 h-[85vh] p-30 overflow-hidden">
                <form className=" form min-w-96 flex flex-col items-center justify-center ">
                {/* <div className='loader'></div> */}

                    <h1 className="text-2xl font-semibold text-left mb-6 font-light">Login to Simplify your format Process
</h1>
                    <div className="mb-4 w-full flex items-center justify-center">
                        <input
                            className="pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid "
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4  w-full flex items-center justify-center">
                        <input
                            className="   pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid "
                            id="password"
                            type={passwordView ? 'text' : 'password'} // Toggle between text and password
                            placeholder="Password"
                        />
                           <div
                className="inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                onClick={togglePasswordView}
            >
                {passwordView ?   <FontAwesomeIcon
                  icon={faEye}
                  className="font text-xl text-cyan-900 "
                /> :  <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="font text-xl text-cyan-900 "
                />}
            </div>
                    </div>
                    {loading? <Preloader/> : 
                    <div className="flex items-center justify-between  w-full flex-row mt-10">
                    <a href='/register' className='flex decoration-none'>SIGN UP</a>
                        <button
                            className="bg-slate-100 hover:bg-cyan-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-slate-900 font-thin"
                            type="submit"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        
                    </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default Login;
