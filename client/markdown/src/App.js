import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Mainpage from './components/Mainpage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Hero from './components/Landing/Hero';
import Home from './components/Landing/Home';
<<<<<<< HEAD
import MarkdownWorkspace from './Workspace';
import SharedDocument from './components/SharedDocuments';
=======
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079

function App() {
  // Assume we have a function to check if user is authenticated
  const isAuthenticated = () => {
    // Check if user is logged in (e.g., by checking a token in localStorage)
    return localStorage.getItem('token') !== null;
  };

  return (
    <div className="App">
    {/* <Hero/> */}
      <Routes>
        {/* Redirect to login if not authenticated, otherwise go to Mainpage */}
        <Route 
          path="/" 
          element={<Hero />} 
          // element={!isAuthenticated() ? <Hero /> : <Navigate to="/login" />} 
        />
        
        {/* Login route */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
                <Route path="/document/:id" element={<SharedDocument />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainPage" element={<MarkdownWorkspace />} />    
=======
        <Route path="/register" element={<Register />} />
        <Route path="/mainPage" element={<Mainpage />} />    
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
        <Route path="/hero" element={<Hero/>} /> 


        
        {/* Register route */}
        <Route path="/register" element={<Register />} />
        
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;