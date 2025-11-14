/**
 * texto de ayuda para los inputs
 * 
 * - `id` - id del input
 * - `name` - name del input
 * - `children` - elementos dentro del `TextHelp`
 * - retorna lo que crees que retorna
 */
const TextHelp = ({id, name, children}) => {
    return (
        <div id={`${id || name}Help`} className="form-text">
            {children}
        </div>
    );
}

export default TextHelp;