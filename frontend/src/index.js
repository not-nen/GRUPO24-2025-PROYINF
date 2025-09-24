import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App';
import Navbar from './components/Navbar';

document.body.setAttribute("data-bs-theme","black");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navbar/>
        <App/>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals