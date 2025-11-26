import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from 'context/authContext';  
import { formatearRut } from 'utils/formatoRut';
import Input from 'components/inputs/Input';

const Login = () => {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth(); 
    const navigate = useNavigate(); 

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
            
            const res = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "rut" : rut,
                    "password" : password
                })
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Error al iniciar sesión.');
            }

            
            login(data.token);
            
            
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <Input
                    id="rut"
                    value={rut}
                    onChange={handleRut} 
                    label="Rut"
                    required
                    maxLength={12}
                    placeholder="11.111.111-1"
                />
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePassword} 
                    label="Contraseña"
                    required
                    maxLength={32}
                />
                {error && <p className="form-text">{error}</p>}

                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;