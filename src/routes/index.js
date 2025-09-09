const express = require('express');
const router = express.Router();
const invoiceRoutes = require('./invoices');

// Rutas de la API
router.use('/invoices', invoiceRoutes);

// Ruta de health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'API FacDin funcionando correctamente'
  });
});

module.exports = router;