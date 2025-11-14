import { useCallback, useEffect, useRef } from "react";
import { ErrorMessage } from "formik";
import TextHelp from "components/subComponents/TextHelp";

/**
 * input estilo tarjeta, para ingresar montos en un formulario.
 * 
 * - retorna el input.
*/
const CreditInput = ({
    id,
    name,
    textHelp,
    value,
    onChange,
    onBlur,
    errors = {},
    touched = {},
}) => {
    const hasError = touched[name] && errors[name];

    const defaultSize = 3; //rem
    const containerPadding = 1.5; //rem
    const sizeStep = 0.025; //rem
    const rem = 16; //px
    const diff = 2; //px
    
    const maxI = 100;

    const container = useRef(null);
    const monto = useRef(null);
    const spanMonto = useRef(null);

    const placeholder = "1,000,000";

    const fixFontSize = useCallback(() => {
        const containerCurr = container.current;
        const montoCurr = monto.current;
        const spanCurr = spanMonto.current;
        if (!containerCurr || !montoCurr || !spanCurr) return;

        const containerWidth = containerCurr.clientWidth - 2 * rem * containerPadding;
        let size = defaultSize;
        let textWidth;
        let i = 0;

        const setFontSize = (size) => {
            if (monto.current && spanMonto.current) {
                monto.current.style.fontSize = `${size}rem`;
                spanMonto.current.style.fontSize = `${size}rem`;
            }
        };

        setFontSize(size);

        while (i < maxI) {
            textWidth = spanCurr.scrollWidth;

            if (Math.abs(textWidth - containerWidth) <= diff) break;

            if (textWidth < containerWidth) size += sizeStep;
            else if (textWidth > containerWidth) size -= sizeStep;

            if (size > defaultSize) {
                size = defaultSize;
                i = maxI;
            }
            setFontSize(size);
            i++;
        }
    }, [defaultSize]);

    useEffect(() => {
        fixFontSize();
        window.addEventListener("resize", fixFontSize);
        return () => window.removeEventListener("resize", fixFontSize);
    }, [fixFontSize]);

    useEffect(() => {
        if (spanMonto.current) spanMonto.current.textContent = value || placeholder || "";
        fixFontSize();
    }, [value, placeholder, fixFontSize]);

    return (
        <div>
            <div
                ref={container}
                className={`d-flex flex-column bg-primary rounded-4 justify-content-end align-items-start text-light mx-auto w-100 ${hasError ? "border border-danger border-4" : ""}`}
                style={{
                    padding: containerPadding + "rem",
                    maxWidth: "500px",
                    minHeight: "fit-content",
                    aspectRatio: "7 / 4",
                }}
            >
                <p className="mb-2">Monto del crédito <span className="text-danger"> *</span></p>
                <span
                    ref={spanMonto}
                    className="krona-one-regular"
                    style={{
                        position: "absolute",
                        visibility: "hidden",
                        fontSize: `${defaultSize}rem`,
                    }}
                />
                <input
                    ref={monto}
                    id={id || name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    className={`krona-one-regular text-light m-0 border-0 bg-transparent shadow-none p-0`}
                    style={{
                        display: "block",
                        width: "100%",
                        outline: "none",
                        fontSize: `${defaultSize}rem`,
                    }}
                    required={true}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
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
}

export default CreditInput;