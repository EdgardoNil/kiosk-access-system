// Importa el Pool de conexiones de PostgreSQL
const { Pool } = require('pg');

// Carga las variables de entorno
require('dotenv').config();

// Crea el pool de conexión hacia PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Exporta el pool para poder utilizarlo en toda la aplicación
module.exports = pool;