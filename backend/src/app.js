// Importar Express y CORS
const express = require('express');
const cors = require('cors');

// Carga las variables de entorno
require('dotenv').config();

// Importa las rutas del check-in
const checkInRoutes = require('./routes/checkIn.routes');

const app = express();

// Habilita CORS y recepción de JSON
app.use(cors());
app.use(express.json());

// Rutas principales de la API
app.use('/api', checkInRoutes);

// Ruta de prueba del servidor
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Backend del kiosco funcionando'
    });
});

const PORT = process.env.PORT || 3000;

// Inicializa el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});