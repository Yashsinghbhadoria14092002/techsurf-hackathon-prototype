import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import dotenv from 'dotenv';
// import { Provider } from 'react-redux';

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <Provider> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>
);
