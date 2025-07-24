const express = require('express');
const router = express.Router();
const { generarEjercicio } = require('../controllers/openaiController');

router.post('/generar', generarEjercicio);

module.exports = router;
