// import logo from './assets/logo.svg';
// import './css/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/about" element={<About/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
