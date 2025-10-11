const Input = ({
    id,
    value,
    setValue,
    label,
    required = false,
    maxLength,
    placeholder,
    type = "text",
    textHelp,
    min,
    max
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>

            <input
                type={type}
                className="form-control"
                id={id}
                value={value}
                onChange={(e) => setValue(e)}
                placeholder={placeholder || ""}
                {...(maxLength ? { maxLength } : {})}
                {...(min ? { min } : {})}
                {...(max ? { max } : {})}
                required={required}
            />

            {textHelp && (
                <div id={`${id}Help`} className="form-text">
                    {textHelp}
                </div>
            )}
        </div>
    );
};

export default Input;
