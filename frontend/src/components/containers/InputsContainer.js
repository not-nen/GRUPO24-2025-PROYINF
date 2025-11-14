/**
 * contenedor para meter inputs.
 * 
 * - retorna el contenedor
*/
const InputsContainer = ({children}) => {
    return (
        <div className="bg-light d-flex flex-column gap-2 p-3 px-4 rounded-4">
            {children}
        </div>
    );
}

export default InputsContainer;