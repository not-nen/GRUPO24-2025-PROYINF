import { ErrorMessage } from "formik";
import TextHelp from "components/subComponents/TextHelp";

/**
 * select para un formulario.
 * 
 * - retorna el select.
*/
const Select = ({
    id,
    name,
    label,
    required = false,
    options = [],
    placeholder = "Seleccione una opción",
    textHelp,
    value,
    onChange,
    onBlur,
    className = "",
    errors = {},
    touched = {},
}) => {
    const hasError = touched[name] && errors[name];

    return (
        <div className="mt-2 position-relative mt-3">
            {label && (
                <label htmlFor={id || name} className="form-label bg-light" style={{position:"absolute", display:"flex", justifyContent:"center", alignItems:"center", padding: "0 0.25rem", top:"-0.8rem", left: "0.75rem", gap:"0.25rem"}}>
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </label>
            )}

            <select
                id={id || name}
                name={name}
                className={`form-select ${hasError ? "is-invalid" : ""} ${className}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            { hasError ? (
                    <ErrorMessage name={name}>
                        {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
                    </ErrorMessage>
                ) : (
                    textHelp
                    &&
                    <TextHelp
                        id={id ?? ""}
                        name={name ?? ""}
                    >
                        {textHelp}
                    </TextHelp>
                )
            }
        </div>
    );
};

export default Select;