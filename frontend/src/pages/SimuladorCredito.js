import { useEffect, useState } from "react";

import Input from "../components/Input";
import Select from "../components/Select";

import { formatearRut } from '../js/formatoRut'

/*

que se necesita:
    * monto del credito
    * plazo en meses
    * tipo de tasa (fija xd)
    * renta liquida mensual -> AL SOLICITAR
    * tipo de trabajador -> AL SOLICITAR
    * Antiguedad laboral (quizas?) -> AL SOLICITAR
    * Edad -> AL SOLICITAR (por carnet)
    * Tiene otras deudas
    * Historial crediticio (opcional)

*/
let SimuladorCredito = () => {
    const [ rut, setRut ] = useState('');
    const [ monto, setMonto ] = useState('');
    const [ plazo, setPlazo ] = useState('');
    const [ plazoCustom, setPlazoCustom ] = useState('');
    const [ primerPago, setPrimerPago ] = useState('');
    const [ renta, setRenta ] = useState('');
    const [ error, setError ] = useState('');

    const [ step, setStep ] = useState(1);
    const [ simulacion, setSimulacion ] = useState({});

    // RUT
    const handleRut = (e) => {
        setError('');
        const rut = e.target.value;
        const rutFormateado = formatearRut(rut);
        setRut(rutFormateado);
    }

    // MONTO
    // DESDE 500.000 A 100.000.000
    // MOMENTANEO PARA PROBAR
    const MIN_MONTO = 500000;
    const MAX_MONTO = 100000000;
    const getMontoNumber = (value) => Number(value.toString().replace(/\D/g, ''));
    const getMontoStr = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const getMontoStrBonito = (value) => 'CLP '+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let checkMonto = (value) => {
        value = getMontoNumber(value);
        return !(value < MIN_MONTO || value > MAX_MONTO);
    }
    const handleMonto = (e) => {
        setError('');
        const input = e.target;
        const selectionStart = input.selectionStart;
        const value = getMontoNumber(input.value);
        if (!value || value === 0) {
            setMonto('');
            return;
        }

        const newMonto = getMontoStr(value);
        let diff = newMonto.length - monto.length;

        if (value > MAX_MONTO || value.length > MAX_MONTO.toString().length) {
            setMonto(monto);
            diff = 0;
        }
        else setMonto(newMonto);

        requestAnimationFrame(() => {
            if (diff < 0) diff++;
            if (diff > 0) diff--;
            const newPos = Math.max(selectionStart + diff, 0);
            input.setSelectionRange(newPos,newPos);
        });
    }

    // PLAZO
    // DE 6 A 60 MESES
    // MOMENTANEO PARA PROBAR
    const MIN_PLAZO = 6;
    const MAX_PLAZO = 60;
    let checkPlazo = (plazo) => !(plazo < MIN_PLAZO || plazo > MAX_PLAZO);
    const handlePlazo = (e) => {
        setError('');
        setPlazo(e.target.value);
        setPlazoCustom('');
    }
    const handlePlazoCustom = (e) => {
        setError('');
        const value = e.target.value;
        if (value > MAX_PLAZO || value.length > MAX_PLAZO.toString().length) setPlazoCustom(plazoCustom);
        else setPlazoCustom(value);
    }

    // PRIMER PAGO
    // DESDE LA FECHA ACTUAL, SE PUEDE PAGAR DESDE EL PRIMER DIA DEL PROXIMO MES O HASTA LA QUINCENA DENTRO DE 3 MESES
    // MOMENTANEO PARA PROBAR
    const hoy = new Date();
    const min = new Date(hoy.getFullYear(),hoy.getMonth()+1,1);
    const max = new Date(hoy.getFullYear(),hoy.getMonth()+4,0);
    max.setDate(Math.min(15,max.getDate()));
    useEffect(() => {
        const hoy = new Date();
        const primerPagoDefault = new Date();
        primerPagoDefault.setDate(hoy.getDate()+30);
        setPrimerPago(primerPagoDefault.toISOString().split("T")[0]);
    }, []);
    const handlePrimerPago = (e) => {
        setError('');
        setPrimerPago(e.target.value);
    }

    // RENTA
    const handleRenta = (e) => {
        setError('');
        setRenta(e.target.value);
    }

    // SUBMIT
    const rangeRenta = [
        500_000,
        1_500_000,
        3_000_000,
        6_000_000
    ]
    let optionsRenta = [];
    for (let i = 0; i <= rangeRenta.length; i++) {
        const minRenta = i === 0 ? null : rangeRenta[i-1];
        const maxRenta = i === rangeRenta.length ? null : rangeRenta[i];
        if (minRenta === null) {
            optionsRenta.push({
                value: `${maxRenta}`,
                label: `Hasta ${getMontoStrBonito(maxRenta)}`
            });
            continue;
        }
        if (maxRenta === null) {
            optionsRenta.push({
                value: `${minRenta}`,
                label: `Mas de ${getMontoStrBonito(minRenta)}`
            });
            continue;
        }
        optionsRenta.push({
            value: `${(maxRenta + minRenta) / 2}`,
            label: `Desde ${getMontoStrBonito(minRenta)} hasta ${getMontoStrBonito(maxRenta)}`
        });
    }
    optionsRenta.push({
        value: '0',
        label: "Otro"
    })

    // SUBMIT (ENVIAR A SIMULAR A BACKEND)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!monto || !plazo) {
            setError("Completa los campos faltantes.");
            return;
        }
        if (!checkMonto(monto) || !(checkPlazo(plazo) || checkPlazo(plazoCustom))) {
            setError("Campos rellenados incorrectamente.")
            return;
        }

        setError('');
        setStep(2);
        try {
            const montoFinal = getMontoNumber(monto);
            const plazoFinal = plazo === 0 ? plazoCustom : plazo;
            const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/simular/credito-consumo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rut: rut,
                    renta: renta,
                    monto: montoFinal,
                    plazo: plazoFinal,
                    pago: primerPago
                })
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(data.error || 'Error al simular credito.');
            }
            setSimulacion(data);

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">
            <p>{step}</p>
            { step === 1 && (
                <form onSubmit={(e) => {handleSubmit(e)}}> 
                    <div>
                        <Input
                            id="rut"
                            value={rut}
                            setValue={handleRut}
                            label="Rut"
                            maxLength={12}
                            textHelp="Ingresa tu rut solamente si quieres una simulación más personalizada."
                            placeholder="11.111.111-1"
                        />

                        <Select
                            id="renta"
                            value={renta}
                            setValue={handleRenta}
                            label="Renta"
                            options={optionsRenta}
                            textHelp="Aproximado de cuanto ganas mensualmente."
                            required
                        />

                        {/* <Input
                            id="renta"
                            value={renta}
                            setValue={handleRenta}
                            label="Renta"
                            textHelp="Aproximado de cuanto ganas mensualmente."
                            required
                        /> */}

                        <Input
                            id="monto"
                            value={monto}
                            setValue={handleMonto}
                            label="Monto"
                            required
                            textHelp={`Monto debe ser entre ${getMontoStrBonito(MIN_MONTO)} y ${getMontoStrBonito(MAX_MONTO)}`}
                        />

                        {monto && (!checkMonto(monto)) && 
                            <div className="form-text text-danger">Ingrese un monto valido.</div>
                        }

                        <Select
                            id="plazo"
                            value={plazo}
                            setValue={handlePlazo}
                            label="Plazo"
                            options={[
                                { value: '6', label: '6 meses' },
                                { value: '12', label: '12 meses' },
                                { value: '24', label: '24 meses' },
                                { value: '36', label: '36 meses' },
                                { value: '48', label: '48 meses' },
                                { value: '60', label: '60 meses' },
                                { value: '0', label: 'Otro' }
                            ]}
                            placeholder="Seleccione un plazo"
                            required
                        />
                        {plazo === '0' && 
                            <Input
                                id="plazoCustom"
                                value={plazoCustom}
                                setValue={handlePlazoCustom}
                                label="Plazo personalizado"
                                required
                                textHelp="Ingrese un plazo entre 6 y 60 meses"
                            />
                        }
                        {plazo === '0' && plazoCustom && (!checkPlazo(plazoCustom)) &&
                            <div className="form-text text-danger">Ingresa un plazo en meses valido.</div>
                        }

                        <Input
                            id="primerPago"
                            type="date"
                            value={primerPago}
                            setValue={handlePrimerPago}
                            label="Primer pago"
                            min={min.toISOString().split("T")[0]}
                            max={max.toISOString().split("T")[0]}
                            textHelp="Fecha en la que puedes realizar tu primer pago."
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Simular</button>
                        {error && 
                            <p className="form-text text-danger">{error}</p>
                        }
                    </div>
                </form>
            )}
            { step === 2 && (
                <div>
                    { simulacion && (
                        <>
                            <h2>SIMULACION:</h2>
                            <p>MONTO: {simulacion.monto}</p>
                            <p>CUOTA MENSUAL: {simulacion.cuotaMensual}</p>
                            <p>INTERES ANUAL: {simulacion.tasaAnual}</p>
                            <p>INTERES MENSUAL: {simulacion.tasaMensual}</p>
                            <p>CAE: {simulacion.CAE}</p>
                            <p>CTC: {simulacion.CTC}</p>
                            <p>PAGO: {simulacion.pago}</p>
                        </>
                    )}
                    <button className="btn btn-secondary" onClick={(e) => {setStep(1);setSimulacion({});}}>Volver</button>
                    <button className="btn btn-primary">Solicitar Credito</button>
                </div>
            )}
        </div>
    );
}

export default SimuladorCredito;