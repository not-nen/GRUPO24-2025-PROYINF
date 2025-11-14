// import logo from './assets/logo.svg';
// import './css/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from 'pages/page';
import Index from 'pages/Index';
import About from 'pages/About';
import SimuladorRoutes from 'pages/simulador/page';
import Register from 'pages/Register';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route index element={<Index/>}/>
                    <Route path="/about" element={<About/>} />
                    {SimuladorRoutes()}
                    <Route path="/crear-cuenta" element={<Register/>} />
                    <Route path="/iniciar-sesion" element={<Login/>} />

                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
