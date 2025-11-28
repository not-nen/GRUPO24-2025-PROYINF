import { useFormikContext } from "formik";
import Input from "components/inputs/Input";
import BtnsContainer from "components/containers/BtnsContainer";
import FillContainer from "components/containers/FillContainer";
import InputsContainer from "components/containers/InputsContainer";

import { useLogin } from "context/loginContext";
import { formatearRut } from "utils/formatoRut";

import { LoginProvider } from "context/loginContext";

const Login = () => null;

Login.data = ["rut", "password"];

Login.Form = function LoginForm() {
    const { values, errors, touched, handleBlur, handleChange, setFieldValue } = useFormikContext();
    const { error } = useLogin();

    const handleRut = (e) => {
        handleChange(e);
        setFieldValue("rut", formatearRut(e.target.value));
    };

    return (
        <>
            <FillContainer>
                <h1 className="display-1 krona-one-regular">Inicia sesión</h1>
            </FillContainer>

            <InputsContainer>
                <Input
                    id="rut"
                    name="rut"
                    label="Rut"
                    value={values.rut}
                    onChange={handleRut}
                    onBlur={handleBlur}
                    placeholder="11.111.111-1"
                    errors={errors}
                    touched={touched}
                />

                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Contraseña"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                />

                {error && <p className="text-danger mt-2">{error}</p>}
            </InputsContainer>
        </>
    );
};

Login.Buttons = function LoginButtons() {
    const { values } = useFormikContext();
    const { handleLogin, loading } = useLogin();

    const submitLogin = async () => {
        const res = await handleLogin(values.rut, values.password);
        if (res.ok) window.location.href = "/";
    };

    return (
        <BtnsContainer>
            <button
                type="button"
                className="btn btn-primary btn-top"
                disabled={loading}
                onClick={submitLogin}
            >
                {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <button
                type="button"
                className="btn btn-outline-dark btn-bottom"
                onClick={() => (window.location.href = "/")}
            >
                ← Volver al inicio
            </button>
        </BtnsContainer>
    );
};

Login.Provider = LoginProvider;

export default Login;