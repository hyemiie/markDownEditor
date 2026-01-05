import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../NavBar/Navbar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
faEye} from "@fortawesome/free-solid-svg-icons";


import CustomAlert from "../CustomAlert/CustomAlert";
import Preloader from "../Preloader";

const Register = () => {

  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
        const token = localStorage.getItem('token');
        
        // if (token) {
        //     navigate('/mainpage'); 
        // }
    }, [navigate]);

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const data = { username, password, email };

    try {
      const response = await axios.post("https://markdowneditor-backend.onrender.com/register", data);
      console.log("response", response);
     
     setTimeout(() => {
        setLoading(false)
        navigate('/Login')
      showAlert('Registeration Successful')
     }, 5000); 

    } catch (error) {
      console.log(error);
      setLoading(false)
      showAlert('Registeration failed')

      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div className="flex flex-col bg-zinc-200 min-h-screen">
    {/* <Navbar/> */}
    {alertVisible && (
        <CustomAlert message={alertMessage} onClose={handleAlertClose} />
      )}
    <div className="h-[1%]">

    {/* <Navbar /> */}
    {/* <Navbar/> */}
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
                <form className="form min-w-96 flex flex-col items-center justify-center border-solid border border-slate-200 rounded-2xl">
                {/* <div className='loader'></div> */}
                    <h1 className="loginHeader text-3xl text-left mb-6 font-medium">CollabMD</h1>
                    <h2 className='flex font-medium text-2xl text'>Join to Simplify your format Process

</h2>
                <a href='/login' className='flex decoration-none hover:text-slate-500 mt-12'> Already have an account? Login</a>

                <div className="mb-4 w-full flex items-center justify-center">
                    <input
                        className="pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid "
                        id="email"
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4 w-full flex items-center justify-center">
                    <input
                        className="pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid "
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4  w-full flex items-center justify-center border-b border-slate-900">
                    <input
                        className="   pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   outline-none  border-solid "
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
                {loading ? <Preloader/>:
                <div className="flex items-center justify-between  w-full flex-col-reverse mt-10">

                    <button
                        className="bg-black hover:bg-slate-900 hover:text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-slate-200  w-full"
                        type="submit"
                        onClick={handleRegister}
                    >
                        Sign Up
                    </button>
                    
                </div>
                }
            </form>
        </div>
    </div>
);
};

export default Register;
