import { useEffect, useState } from "react";

import Input from "../components/Input";
import Select from "../components/Select";

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
    const [ monto, setMonto ] = useState('');
    const [ plazo, setPlazo ] = useState('');
    const [ plazoCustom, setPlazoCustom ] = useState('');
    const [ primerPago, setPrimerPago ] = useState('');
    const [ error, setError ] = useState('');

    const hoy = new Date();
    const min = new Date(hoy.getFullYear(),hoy.getMonth()+1,1);
    const max = new Date(hoy.getFullYear(),hoy.getMonth()+4,0);
    max.setDate(Math.min(15,max.getDate()));

    // MONTO
    const MIN_MONTO = 500000;
    const MAX_MONTO = 100000000;
    const getMontoNumber = (value) => Number(value.toString().replace(/\D/g, ''));
    const getMontoStr = (value) => 'CLP '+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
    const handlePrimerPago = (e) => {
        setError('');
        setPrimerPago(e.target.value);
    }

    // SUBMIT
    const handleSubmit = (e) => {
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
    }

    useEffect(() => {
        const primerPagoDefault = new Date();
        primerPagoDefault.setDate(hoy.getDate()+30);
        setPrimerPago(primerPagoDefault.toISOString().split("T")[0]);
    }, []);

    return (
        <div className="container">
            <form onSubmit={(e) => {handleSubmit(e)}}> 
                <div>
                    <Input
                        id="monto"
                        value={monto}
                        setValue={handleMonto}
                        label="Monto"
                        required
                        textHelp={`Monto debe ser entre ${getMontoStr(MIN_MONTO)} y ${getMontoStr(MAX_MONTO)}`}
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
        </div>
    );
}

export default SimuladorCredito;