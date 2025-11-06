export const formatearRut = (rut) => {
    if (rut.length < 2) return rut;
    if (rut.length > 12) return rut.slice(0, 12);
    let rutLimpio =  rut.replace(/[^0-9kK]/g, '').toUpperCase();

    let cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1);

    let aux = '';
    let i = 0;
    for (let pos = cuerpo.length - 1; pos >= 0; pos--) {
        aux = cuerpo[pos] + aux;
        i++;
        if (i % 3 === 0 && pos !== 0) {
            aux = '.' + aux;
        }
    }
    return aux + '-' + dv;
}