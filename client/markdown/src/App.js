import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Mainpage from './components/Mainpage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Hero from './components/Landing/Hero';
import Home from './components/Landing/Home';
import MarkdownWorkspace from './Workspace';
import SharedDocument from './components/SharedDocuments';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <div className="App">
    {/* <Hero/> */}
      <Routes>
        <Route 
          path="/" 
          element={<Hero />} 
          // element={!isAuthenticated() ? <Hero /> : <Navigate to="/login" />} 
        />
        
        {/* Login route */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
                <Route path="/document/:id" element={<SharedDocument />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainPage" element={<MarkdownWorkspace />} />    
        <Route path="/hero" element={<Hero/>} /> 


        
        <Route path="/register" element={<Register />} />
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;