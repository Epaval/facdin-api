const { sequelize } = require('../config/database');

exports.getInvoices = async (req, res) => {
  try {
    console.log('📦 Obteniendo facturas...');
    const [invoices] = await sequelize.query('SELECT * FROM invoices ORDER BY "createdAt" DESC');
    
    res.json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    console.error('❌ Error obteniendo facturas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📋 Obteniendo factura ID: ${id}`);
    
    const [invoices] = await sequelize.query('SELECT * FROM invoices WHERE id = $1', [id]);
    
    if (invoices.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }
    
    // Obtener items de la factura
    const [items] = await sequelize.query('SELECT * FROM invoice_items WHERE "invoiceId" = $1', [id]);
    
    res.json({
      success: true,
      data: {
        ...invoices[0],
        items: items
      }
    });
  } catch (error) {
    console.error('❌ Error obteniendo factura:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para crear una factura de ejemplo
exports.createExampleInvoice = async (req, res) => {
  try {
    console.log('🆕 Creando factura de ejemplo...');
    
    // Insertar factura
    const [invoice] = await sequelize.query(`
      INSERT INTO invoices ("rifEmisor", "razonSocialEmisor", "rifReceptor", "razonSocialReceptor", 
                           "numeroControl", "numeroFactura", "subtotal", "iva", "total", "status")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      'J123456789', 
      'Mi Empresa C.A.', 
      'V999888777', 
      'Cliente Nuevo', 
      'CTRL2024099999', 
      'F001-0009999',
      100.00,
      16.00,
      116.00,
      'procesada'
    ]);
    
    res.json({
      success: true,
      message: 'Factura de ejemplo creada',
      data: invoice[0]
    });
  } catch (error) {
    console.error('❌ Error creando factura:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};