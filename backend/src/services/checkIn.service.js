const memberRepository = require('../repositories/member.repository');
const accessLogRepository = require('../repositories/accessLog.repository');

// Validar el acceso del miembro y registra el intento
const checkIn = async (accessCode) => {

    // Buscar el miembro por su código de acceso
    const member = await memberRepository.findByAccessCode(accessCode);

    // Validar si el miembro existe
    if (!member) {

        // Registra intento denegado
        await accessLogRepository.createAccessLog(null, 'denegado');

        return {
            success: false,
            message: 'Acceso denegado / Código inválido'
        };
    }

    // Validar si el miembro está activo
    if (member.status !== 'activo') {

        // Registra intento denegado
        await accessLogRepository.createAccessLog(member.id, 'denegado');

        return {
            success: false,
            message: 'Acceso denegado / Usuario inactivo'
        };
    }

    // Registra acceso concedido
    await accessLogRepository.createAccessLog(member.id, 'concedido');

    return {
        success: true,
        message: 'Acceso concedido',
        member: {
            id: member.id,
            name: member.name
        }
    };
};

module.exports = {
    checkIn
};