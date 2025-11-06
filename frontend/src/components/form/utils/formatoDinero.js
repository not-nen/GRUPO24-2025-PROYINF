export const formatearDineroNumber = (value) => Number(value.toString().replace(/\D/g, ''));

export const formatearDineroStr = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const formatearDineroStrBonito = (value) => 'CLP ' + formatearDineroStr(value);