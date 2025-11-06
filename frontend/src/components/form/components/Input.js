import { ErrorMessage } from "formik";

const Input = ({
    id,
    name,
    label,
    required = false,
    maxLength,
    placeholder = "",
    type = "text",
    textHelp,
    min,
    max,
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

            <input
                id={id || name}
                name={name}
                type={type}
                placeholder={placeholder}
                className={`form-control ${hasError ? "is-invalid" : ""} ${className}`}
                maxLength={maxLength}
                min={min}
                max={max}
                required={required}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />

            {textHelp && <div className="form-text">{textHelp}</div>}

            <ErrorMessage name={name}>
                {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
            </ErrorMessage>

        </div>
    );
};

export default Input;