// Importa la conexión a PostgreSQL
const pool = require('../config/database');

// Busca un miembro por su código de acceso
const findByAccessCode = async (accessCode) => {

    const query = `
        SELECT id, name, access_code, status
        FROM members
        WHERE access_code = $1
        LIMIT 1;
    `;

    // Ejecuta la consulta
    const result = await pool.query(query, [accessCode]);

    // Retorna el primer registro encontrado
    return result.rows[0];
};

module.exports = {
    findByAccessCode
};