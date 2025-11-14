/**
 * contenedor para meter formularios.
 * 
 * - retorna el contenedor
*/
const FormContainer = ({children}) => {
    return (
        <div className="d-flex flex-column gap-3 h-100 fit-flex">
            {children}
        </div>
    )
}

export default FormContainer;