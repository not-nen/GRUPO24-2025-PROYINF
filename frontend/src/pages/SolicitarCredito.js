/*

que se necesita:
    * cedula de identidad vigente
    * comprobante de ingresos
        * trabajador: liquidaciones de sueldo recientes
        * independiente: boletas de honorarios, declaracion de renta, etc.
    * certificado de antiguedad en el trabajo o actividad (dependiente o independiente)
    * verificacion de domicilio: boleta de servicios basicos, contrato de arriendo, etc
    * ingresos y deudas te permitan asumir el credito (capacidad de pago)
    * edad minima legal (18)

*/
let SolicitarCredito = () => {
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

export default SolicitarCredito;