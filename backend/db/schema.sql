CREATE TABLE cliente (

    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

    rut varchar(12) unique not null,

    nombres VARCHAR(50) not null,

    apellidos VARCHAR(50) not null,

    fecha_nacimiento date not null,

    telefono char(15) not null,

    email varchar(100) not null,

    direccion TEXT not null,

    created_at TIMESTAMPTZ DEFAULT now(),

    updated_at TIMESTAMPTZ DEFAULT now()

);



CREATE TABLE usuario (

    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

    cliente_id BIGINT REFERENCES cliente(id) ON DELETE CASCADE,

    username varchar(50) unique not null,

    password char(64) not null,

    estado BOOLEAN DEFAULT true,

    ultimo_login TIMESTAMPTZ

);

CREATE TABLE contrato(

    id BIGINT PRIMARY KEY,

    cliente_id BIGINT REFERENCES cliente(id) ON UPDATE CASCADE,

    n_contrato char(20) unique not null,

    fecha_firma DATE NOT NULL,

    estado char(20) NOT NULL,

    monto NUMERIC(14,2) NOT NULL,

    tasa_interes NUMERIC(6,3) NOT NULL,

    plazo_meses INT NOT NULL,

    fecha_inicio DATE,

    fecha_termino DATE,

    created_at TIMESTAMPTZ DEFAULT now()

);



CREATE TABLE prestamo (

    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

    contrato_id BIGINT REFERENCES contrato(id) ON UPDATE CASCADE,

    nombre char(100) not null,

    categoria TEXT not null,

    descripcion TEXT,

    min_monto NUMERIC(14,2) NOT NULL,

    max_monto NUMERIC(14,2) NOT NULL,

    plazo_meses INT NOT NULL,

    tasa_base NUMERIC(6,3) NOT NULL

);





CREATE TABLE pago (

    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

    prestamo_id BIGINT REFERENCES prestamo(id) ON UPDATE CASCADE,

    fecha_pago DATE NOT NULL,

    monto NUMERIC(14,2) NOT NULL,

    estado TEXT,

    medio_pago TEXT

);
