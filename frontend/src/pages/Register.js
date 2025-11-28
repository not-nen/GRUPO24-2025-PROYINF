import { useFormikContext } from "formik";

import Input from "components/inputs/Input";
import BtnsContainer from "components/containers/BtnsContainer";
import FillContainer from "components/containers/FillContainer";
import InputsContainer from "components/containers/InputsContainer";

import { formatearRut } from "utils/formatoRut";
import { useRegister } from "context/registerContext";
import { useNavigate } from "react-router-dom";

import { RegisterProvider } from "context/registerContext";

const Register = () => null;

Register.data = [
    "rut",
    "nombre",
    "apellido",
    "email",
    "password",
    "confirmPassword"
];

Register.Form = function RegisterForm() {
    const { values, handleChange, handleBlur, setFieldValue, errors, touched } = useFormikContext();
    const { error } = useRegister();

    const handleRut = (e) => {
        const formatted = formatearRut(e.target.value);
        setFieldValue("rut", formatted);
    };

    return (
        <>
            <FillContainer>
                <h1 className="display-1 krona-one-regular">Crea tu cuenta</h1>
            </FillContainer>
            <InputsContainer>
                <Input
                    id="rut"
                    name="rut"
                    label="RUT"
                    value={values.rut}
                    onChange={handleRut}
                    onBlur={handleBlur}
                    required
                    maxLength={12}
                    placeholder="11.111.111-1"
                    errors={errors}
                    touched={touched}
                />

                <Input
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    errors={errors}
                    touched={touched}
                />

                <Input
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    value={values.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    errors={errors}
                    touched={touched}
                />

                <Input
                    id="email"
                    name="email"
                    label="Correo"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    errors={errors}
                    touched={touched}
                />

                <Input
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={32}
                    errors={errors}
                    touched={touched}
                />

                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={32}
                    errors={errors}
                    touched={touched}
                />

                {error && <p className="form-text text-danger">{error}</p>}
            </InputsContainer>
        </>
    );
};

Register.Buttons = function RegisterButtons() {
    const { registerUser, loading } = useRegister();
    const navigate = useNavigate();
    const { values } = useFormikContext();

    const submit = async () => {
        const res = await registerUser(values);
        if (res.ok) navigate("/login");
    };

    return (
        <BtnsContainer>
            <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
                disabled={loading}
            >
                {loading ? "Registrando..." : "Crear cuenta →"}
            </button>
        </BtnsContainer>
    );
};

Register.Provider = RegisterProvider;

export default Register;