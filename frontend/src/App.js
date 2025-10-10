// import logo from './assets/logo.svg';
// import './css/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import About from './pages/About';
import SimuladorCredito from './pages/SimuladorCredito';
import SolicitarCredito from './pages/SolicitarCredito';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/simular-credito" element={<SimuladorCredito/>} />
                <Route path="/solicitar-credito" element={<SolicitarCredito/>} />
                <Route path="/crear-cuenta" element={<Register/>} />
                <Route path="/iniciar-sesion" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
