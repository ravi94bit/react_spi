import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';


function App() {

  const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("authToken"); // Check if user is logged in
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };
  
  const ProtectedAuthRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("authToken"); // Check if user is logged in
    return !isAuthenticated ? element : <Navigate to="/" replace />;
  };


  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<ProtectedAuthRoute element={<Login />} />} />
        <Route path="/register" element={<ProtectedAuthRoute element={<Register />} />} />
      </Routes>
    </Router>

  )
}

export default App
