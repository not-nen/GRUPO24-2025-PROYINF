/**
 * contenedor para meter cosas como las tarjetas con el
 * monto del credito, el resultado de simulacion, etc.
 * 
 * - retorna el contenedor
*/
const CardsContainer = ({children}) => {
    return (
        <div className="bg-light d-flex flex-column gap-2 p-3 mx-auto rounded-5 w-100" style={{
            maxWidth: "600px"
        }}>
            {children}
        </div>
    );
}

export default CardsContainer;