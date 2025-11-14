/**
 * contenedor para meter titulos, texto, o nada.
 * 
 * Es para rellenar mas que nada, pero se puede usar para
 * lo ya mencionado.
 * 
 * - retorna el contenedor
*/
const FillContainer = ({children}) => {
    return (
        <div className="d-flex flex-column px-4 h-100 fit-flex justify-content-center align-items-center">
            {children ?? <p></p>}
        </div>
    )
}

export default FillContainer;