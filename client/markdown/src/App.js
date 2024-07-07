import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Mainpage from './components/Mainpage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  // Assume we have a function to check if user is authenticated
  const isAuthenticated = () => {
    // Check if user is logged in (e.g., by checking a token in localStorage)
    return localStorage.getItem('token') !== null;
  };

  return (
    <div className="App">
      <Routes>
        {/* Redirect to login if not authenticated, otherwise go to Mainpage */}
        <Route 
          path="/" 
          element={!isAuthenticated() ? <Mainpage /> : <Navigate to="/login" />} 
        />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        <Route path="/mainPage" element={<Mainpage />} />
        
        {/* Register route */}
        <Route path="/register" element={<Register />} />
        
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;