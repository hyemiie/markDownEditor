import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {

  const navigate = useNavigate();
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

    } catch (error) {
      console.log(error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div className="h-screen flex p-24 bg-slate-500">
      <div className="w-1/2 bg-gradient-to-r from-cyan-600 to-slate-300 flex justify-center items-center p-10">
        <div className="text-white text-center">
          <h1 className="text-3xl font-semibold mb-4">Create an Account</h1>
          <p className="text-lg mb-4">Sign up to access your account</p>
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="w-3/4 bg-slate-500 shadow-md rounded px-8 py-8"
          onSubmit={handleRegister}
        >
          <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
