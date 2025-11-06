import { ErrorMessage } from "formik";

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
        <div className="mb-3">
            {label && (
                <label htmlFor={id || name} className="form-label">
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
                    textHelp && <div id={`${id || name}Help`} className="form-text">{textHelp}</div>
                )
            }
        </div>
    );
};

export default Select;