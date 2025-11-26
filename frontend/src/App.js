import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from 'pages/page';
import Index from 'pages/Index';
import About from 'pages/About';
import ScannerPage from 'pages/ScannerPage'; 
import SimuladorRoutes from 'pages/simulador/page';
import Register from 'pages/Register';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import { AuthProvider } from 'context/authContext';
import Historial from 'pages/Historial';

function App() {
    return (
        <AuthProvider> {}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}>
                        {}
                        <Route index element={<Index/>}/>
                        <Route path="/about" element={<About/>} />
                        <Route path="/escanear" element={<ScannerPage/>} />
                        {SimuladorRoutes()}
                        <Route path="/crear-cuenta" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/historial" element={<Historial/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;