/*

que se necesita:
    * monto del credito
    * plazo en meses
    * tipo de tasa (fija/variable)
    * renta liquida mensual
    * tipo de trabajador
    * Antiguedad laboral
    * Edad
    * Tiene otras deudas
    * Historial crediticio (opcional)

*/
let SimuladorCredito = () => {
    return (
        <div className="container">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
            </form>
        </div>
    );
}

export default SimuladorCredito;