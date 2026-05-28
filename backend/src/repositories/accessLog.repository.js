// Importa la conexión a PostgreSQL
const pool = require('../config/database');

// Guarda un registro de acceso
const createAccessLog = async (memberId, result) => {

    const query = `
        INSERT INTO access_logs (member_id, result)
        VALUES ($1, $2)
        RETURNING *;
    `;

    // Ejecuta la inserción
    const response = await pool.query(query, [memberId, result]);

    // Retorna el registro creado
    return response.rows[0];
};

module.exports = {
    createAccessLog
};