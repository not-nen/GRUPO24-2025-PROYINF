import { useCallback, useLayoutEffect, useRef } from "react";
import { formatearDineroStrBonito } from "utils/formatoDinero";

const defaultSize = 3.5; //rem
const containerPadding = 1.75; //rem
const sizeStep = 0.025; //rem
const rem = 16; //px
const diff = 2; //px

const maxI = 100;

const CreditoSimulado = ({
    monto,
    cuotaMensual,
    pago,
    CAE,
    interesAnual,
    interesMensual,
    CTC
}) => {
    const container = useRef(null);

    return (
        <div ref={container} className="d-flex flex-column bg-dark-alt rounded-4 justify-content-center align-items-start text-light mx-auto w-100 gap-3 overflow-hidden border border-light border-3" style={{
            padding: containerPadding + "rem",
            minHeight: "fit-content",
        }}>
            <MontoCredito monto={monto} containerRef={container}/>
            <ContainerFilas>
                <FilaCredito label={"Cuota mensual"} value={formatearDineroStrBonito(cuotaMensual)}/>
                <FilaCredito label={"Fecha primer pago"} value={pago}/>
                <FilaCredito label={"CAE"} value={CAE+" %"}/>
            </ContainerFilas>
            <ContainerFilas>
                <FilaCredito label={"Interes Anual"} value={interesAnual+" %"}/>
                <FilaCredito label={"Interes Mensual"} value={interesMensual+" %"}/>
                <FilaCredito label={"CTC"} value={formatearDineroStrBonito(CTC)}/>
            </ContainerFilas>
        </div>
    )
}

const ContainerFilas = ({children}) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-start w-100 gap-1">
            {children}
        </div>
    );
}

const MontoCredito = ({monto, containerRef}) => {
    const montoRef = useRef(null);

    const fixFontSize = useCallback(() => {
        const containerCurr = containerRef.current;
        const montoCurr = montoRef.current;
        if (!containerCurr || !montoCurr) return;

        const containerWidth = containerCurr.clientWidth - 2 * rem * containerPadding;
        let size = defaultSize;
        let textWidth;
        let i = 0;

        const setFontSize = (size) => {
            if (montoRef.current) montoRef.current.style.fontSize = `${size}rem`;
        }

        setFontSize(size);

        while (i < maxI) {
            textWidth = montoCurr.scrollWidth;

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
    }, [containerRef]);

    useLayoutEffect(() => {
        if (montoRef.current) montoRef.current.textContent = formatearDineroStrBonito(monto);
        requestAnimationFrame(() => fixFontSize());
        window.addEventListener("resize", fixFontSize);
        return () => window.removeEventListener("resize", fixFontSize);
    }, [fixFontSize, monto])

    return (
        <div className="d-flex flex-column w-100 gap-3 mb-5">
            <p className="w-100 m-0">Tu simulacion</p>
            <p ref={montoRef} className="krona-one-regular text-nowrap w-100 m-0">{formatearDineroStrBonito(monto)}</p>
        </div>
    );
}

const FilaCredito = ({label, value}) => {
    return (
        <div className="d-flex flex-row w-100 justify-content-between">
            <p className="m-0">{label}</p>
            <p className="fw-medium m-0">{value}</p>
        </div>
    );
}

export default CreditoSimulado;