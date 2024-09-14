import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure you import Router

// Initialize Google Analytics
ReactGA.initialize('G-KRZV2Z8TEF');

// Create the root element for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);