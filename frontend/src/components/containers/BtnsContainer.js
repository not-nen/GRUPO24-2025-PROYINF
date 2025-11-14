/**
 * contenedor para meter botones.
 * 
 * - retorna el contenedor
*/
const BtnsContainer = ({children}) => {
    return (
        <div className="bg-light d-flex flex-column gap-2 p-3 rounded-6">
            {children}
        </div>
    )
}

export default BtnsContainer;