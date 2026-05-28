const checkInService = require('../services/checkIn.service');

// Controlador principal del endpoint de acceso
const checkIn = async (req, res) => {
    try {

        // Obtiene el código enviado desde el cliente
        const { access_code } = req.body;

        // Validar que el código exista
        if (!access_code) {
            return res.status(400).json({
                success: false,
                message: 'El código de acceso es obligatorio'
            });
        }

        // Ejecuta la lógica principal del check-in
        const result = await checkInService.checkIn(access_code);

        // Retorna la respuesta al cliente
        return res.status(result.success ? 200 : 401).json(result);

    } catch (error) {

        // Manejo de errores internos
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

module.exports = {
    checkIn
};