const Select = ({
    id,
    value,
    setValue,
    label,
    required = false,
    options = [],
    placeholder = "Seleccione una opción",
    textHelp
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>

            <select
                id={id}
                className="form-select"
                value={value}
                onChange={(e) => setValue(e)}
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

            {textHelp && (
                <div id={`${id}Help`} className="form-text">
                    {textHelp}
                </div>
            )}
        </div>
    );
};

export default Select;