const { sequelize } = require('../src/config/database');

console.log('🔍 Verificando datos en la base de datos...');

const verifyData = async () => {
  try {
    // Contar facturas
    const [invoiceCount] = await sequelize.query('SELECT COUNT(*) FROM invoices');
    console.log(`📊 Facturas en sistema: ${invoiceCount[0].count}`);
    
    // Contar items
    const [itemCount] = await sequelize.query('SELECT COUNT(*) FROM invoice_items');
    console.log(`📦 Items de factura: ${itemCount[0].count}`);
    
    // Mostrar algunas facturas
    if (invoiceCount[0].count > 0) {
      const [invoices] = await sequelize.query('SELECT "numeroFactura", "rifEmisor", "total", "status" FROM invoices LIMIT 5');
      console.log('📝 Últimas facturas:');
      invoices.forEach(invoice => {
        console.log(`   - ${invoice.numeroFactura} | ${invoice.rifEmisor} | ${invoice.total} | ${invoice.status}`);
      });
    }
    
    console.log('✅ Verificación completada');
  } catch (error) {
    console.error('❌ Error verificando datos:', error.message);
  }
};

verifyData();