
BEGIN;

INSERT INTO cliente (rut, nombres, apellidos, fecha_nacimiento, telefono, email, direccion) VALUES
('11.111.111-1', 'Ana', 'Pérez González', '1990-05-15', '+56911111111', 'ana.perez@email.com', 'Av. Siempre Viva 742, Santiago'),
('22.222.222-2', 'Bruno', 'Díaz Morales', '1985-11-30', '+56922222222', 'bruno.diaz@email.com', 'Calle Falsa 123, Valparaíso'),
('33.333.333-3', 'Carla', 'Soto Castro', '1995-02-20', '+56933333333', 'carla.soto@email.com', 'Pasaje El Roble 45, Concepción');

INSERT INTO usuario (cliente_id, username, password, estado) VALUES
(1, 'anaperez', 'contraseña1', true),
(2, 'brunodiaz', 'contraseña2', true),
(3, 'carlasoto', 'contraseña3', false); -- Usuario inactivo


INSERT INTO contrato (id, cliente_id, n_contrato, fecha_firma, estado, monto, tasa_interes, plazo_meses, fecha_inicio, fecha_termino) VALUES
(101, 1, 'CONTRATO-001', '2024-01-15', 'Activo', 5000000, 1.25, 24, '2024-02-01', '2026-02-01'),
(102, 2, 'CONTRATO-002', '2024-03-10', 'Activo', 10000000, 0.95, 36, '2024-04-01', '2027-04-01'),
(103, 1, 'CONTRATO-003', '2023-05-01', 'Pagado', 1500000, 1.80, 12, '2023-05-01', '2024-05-01');

INSERT INTO prestamo (contrato_id, nombre, categoria, descripcion, min_monto, max_monto, plazo_meses, tasa_base) VALUES
(101, 'Crédito de Consumo Rápido', 'Consumo', 'Préstamo personal para fines generales.', 1000000, 5000000, 24, 1.2),
(102, 'Crédito Hipotecario 10.000 UF', 'Hipotecario', 'Financiamiento para primera vivienda.', 5000000, 50000000, 36, 0.9),
(103, 'Crédito de Emergencia', 'Emergencia', 'Adelanto para emergencias médicas.', 500000, 2000000, 12, 1.7);

INSERT INTO pago (prestamo_id, fecha_pago, monto, estado, medio_pago) VALUES
(1, '2024-03-01', 218000, 'Completado', 'Transferencia'),
(1, '2024-04-01', 218000, 'Completado', 'Transferencia'),
(2, '2024-05-01', 320000, 'Completado', 'Débito Automático'),
(2, '2024-06-01', 320000, 'Pendiente', 'Débito Automático'),
(3, '2024-04-01', 137000, 'Completado', 'Transferencia');


COMMIT;