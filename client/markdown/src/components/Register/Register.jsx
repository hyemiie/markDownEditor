import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../NavBar/Navbar";
import { useState } from "react";

import CustomAlert from "../CustomAlert/CustomAlert";

const Register = () => {

  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
      };
    
      const handleAlertClose = () => {
        setAlertVisible(false);
        setAlertMessage('');
      }



  const handleRegister = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const data = { username, password, email };

    try {
      const response = await axios.post("http://localhost:5000/register", data);
      console.log("response", response);
      navigate('/Login')
      showAlert('Registeration Successful')

    } catch (error) {
      console.log(error);
      showAlert('Registeration failed')

      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
    {/* <Navbar/> */}
    {alertVisible && (
        <CustomAlert message={alertMessage} onClose={handleAlertClose} />
      )}
    <div className="h-[1%]">

    {/* <Navbar /> */}
    <Navbar/>
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

        <div className="w-[100%] flex justify-center items-center pt-20 h-[85vh] p-30  ">
            <form className="  min-w-96 flex flex-col items-center justify-center ">
            <div className='loader'></div>

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
                <div className="mb-4 w-full flex items-center justify-center">
                    <input
                        className="pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid "
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4  w-full flex items-center justify-center">
                    <input
                        className="   pt-8 w-[100%] text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-t-transparent border-l-transparent border-r-transparent   border-b border-slate-900 outline-none  border-solid "
                        id="password"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="flex items-center justify-between  w-full flex-row mt-10">
                <a href='/login' className='flex decoration-none'> Already have an account? Login</a>

                    <button
                        className="bg-slate-100 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-slate-900 font-thin"
                        type="submit"
                        onClick={handleRegister}
                    >
                        Sign Up
                    </button>
                    
                </div>
            </form>
        </div>
    </div>
);
};

export default Register;
