const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// GET /api/invoices - Obtener todas las facturas
router.get('/', invoiceController.getInvoices);

// GET /api/invoices/:id - Obtener factura por ID
router.get('/:id', invoiceController.getInvoiceById);

// POST /api/invoices/example - Crear factura de ejemplo
router.post('/example', invoiceController.createExampleInvoice);

module.exports = router;