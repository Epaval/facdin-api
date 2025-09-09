require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { sequelize, testConnection } = require('./src/config/database');
const apiRoutes = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
// Rutas básicas
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a FacDin API - Sistema de Facturación Digital Venezuela',
    version: '1.0.0',
    endpoints: {
      docs: '/api/docs',
      health: '/api/health',
      invoices: '/api/invoices'
    }
  });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.status(dbStatus ? 200 : 500).json({
    status: dbStatus ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    database: dbStatus ? 'connected' : 'disconnected'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo salió mal en el servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.originalUrl} no existe`
  });
});

// Inicialización del servidor
const startServer = async () => {
  try {
    console.log('🚀 Iniciando FacDin API...');
    
    // Probar conexión a la base de datos
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.log('⚠️  Servidor iniciado sin conexión a base de datos');
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor FacDin corriendo en: http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;