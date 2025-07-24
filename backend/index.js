const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Importar Mongoose
require('dotenv').config();

const app = express();

// Configuraciones básicas
app.use(cors());
app.use(express.json());

// Importar rutas
const openaiRoutes = require('./routes/openaiRoutes');

// Conexión a MongoDB con manejo de errores
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,       // Opcional para versiones antiguas
      // useFindAndModify: false    // Opcional para versiones antiguas
    });
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Salir del proceso con error
  }
};

// Ejecutar la conexión a la base de datos
connectDB();

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.json({
    status: 'TheraVoice API funcionando',
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado',
    timestamp: new Date().toISOString()
  });
});

// Registrar rutas
app.use('/api/openai', openaiRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;

// Iniciar servidor solo si hay conexión a la base de datos
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Base de datos: ${mongoose.connection.host}/${mongoose.connection.name}`);
  });
});

