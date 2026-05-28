-- Crear base de datos
CREATE DATABASE kiosk_access;

-- Tabla de miembros
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    access_code VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('activo', 'inactivo'))
);

-- Tabla de Registros
CREATE TABLE access_logs (
    id SERIAL PRIMARY KEY,
    member_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    result VARCHAR(20) NOT NULL
        CHECK (result IN ('concedido', 'denegado')),

    CONSTRAINT fk_member
        FOREIGN KEY (member_id)
        REFERENCES members(id)
        ON DELETE SET NULL
);

INSERT INTO members (name, access_code, status)
VALUES
    ('Edgardo Nil', 'ABC123', 'activo'),
    ('Yaderim Guzman', 'XYZ789', 'inactivo'),
    ('Roberto Garcia', 'TEST456', 'activo');