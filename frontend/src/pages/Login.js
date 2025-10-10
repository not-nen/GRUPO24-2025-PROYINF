import { useState } from 'react';

import { formatearRut } from '../js/formatoRut';

let Login = () => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRut = (rut) => {
        const rutFormateado = formatearRut(rut);
        setRut(rutFormateado);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rut,
                    password
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Error al iniciar sesion.');
            }

            localStorage.setItem('token', data.token);
            window.location.href = '/';

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="rut" className="form-label">Rut</label>
                    <input className="form-control" id="rut" placeholder="11.111.111-1" value={rut} onChange={(e) => handleRut(e.target.value)} maxLength={12} required></input>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={32} required></input>
                </div>

                {error && <p className="form-text">{error}</p>}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;