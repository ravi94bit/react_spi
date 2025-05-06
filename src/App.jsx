import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import AppRoutes from './routes';
import { Component } from './config/constants';



function App() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  console.log('Redux State: isAuthenticated =', isAuthenticated);

  useEffect(() => {
    document.title = Component; // This will be "HOBO Admin"
  }, []);

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
}

export default App;
