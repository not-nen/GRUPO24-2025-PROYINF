/**
 * botonsito para volver atras en un formulario
 * 
 * hay que darle el handler
 * 
 * - `onClick` - el handler para volver
 * - retorna lo que crees que retorna
 */
const PrevStepBtn = ({ onClick }) => {
    return (
        <div className="d-flex flex-column p-3 w-100">
            <button className="btn btn-outline-dark d p-0 w-3rem h-3rem" type="button" onClick={onClick}>
                ←
            </button>
        </div>
    )
}

export default PrevStepBtn;