import { useState } from 'react';

import { formatearRut } from '../js/formatoRut';

let Register = () => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRut = (rut) => {
        const rutFormateado = formatearRut(rut);
        setRut(rutFormateado);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    email,
                    rut,
                    password,
                    confirmPassword
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Error al registrar cliente.');
            }
            window.location.href = '/login';
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
                    <label for="nombre" className="form-label">Nombre</label>
                    <input className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required></input>
                </div>

                <div className="mb-3">
                    <label for="apellido" className="form-label">Apellido</label>
                    <input className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required></input>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Correo</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={32} required></input>
                </div>

                <div className="mb-3">
                    <label for="confirm_password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} maxLength={32} required></input>
                </div>

                {error && <p className="form-text">{error}</p>}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;