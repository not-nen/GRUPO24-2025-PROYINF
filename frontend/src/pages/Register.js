import { useState } from 'react';

import { formatearRut } from 'utils/formatoRut';

import Input from 'components/inputs/Input';

let Register = () => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleNombre = (e) => {
        setError('');
        setNombre(e.target.value);
    }
    const handleApellido = (e) => {
        setError('');
        setApellido(e.target.value);
    }
    const handleEmail = (e) => {
        setError('');
        setEmail(e.target.value);
    }
    const handleRut = (e) => {
        setError('');
        const rut = e.target.value;
        const rutFormateado = formatearRut(rut);
        setRut(rutFormateado);
    }
    const handlePassword = (e) => {
        setError('');
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setError('');
        setConfirmPassword(e.target.value);
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
                    "nombre" : nombre,
                    "apellido" : apellido,
                    "email" : email,
                    "rut" : rut,
                    "password" : password,
                    "confirmPassword" : confirmPassword
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
                <Input
                    id="rut"
                    label="Rut"
                    value={rut}
                    onChange={handleRut}
                    required
                    maxLength={12}
                    placeholder="11.111.111-1"
                />

                <Input
                    id="nombre"
                    label="Nombre"
                    value={nombre}
                    onChange={handleNombre}
                    required
                />

                <Input
                    id="apellido"
                    label="Apellido"
                    value={apellido}
                    onChange={handleApellido}
                    required
                />

                <Input
                    id="email"
                    label="Correo"
                    value={email}
                    onChange={handleEmail}
                    type="email"
                    required
                />

                <Input
                    id="password"
                    label="Contraseña"
                    value={password}
                    onChange={handlePassword}
                    type="password"
                    maxLength={32}
                    required
                />

                <Input
                    id="confirm_password"
                    label="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    type="password"
                    maxLength={32}
                    required
                />

                {error && <p className="form-text">{error}</p>}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;