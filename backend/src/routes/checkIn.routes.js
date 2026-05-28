// Importar Express
const express = require('express');

// Importar el controlador de check-in
const checkInController = require('../controllers/checkIn.controller');

const router = express.Router();

// Endpoint principal del kiosco
router.post('/check-in', checkInController.checkIn);

module.exports = router;