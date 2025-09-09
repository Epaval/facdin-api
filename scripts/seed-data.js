const { sequelize } = require('../src/config/database');

console.log('🌱 Insertando datos de prueba...');

const seedData = async () => {
  try {
    // 1. Insertar facturas
    console.log('📝 Insertando facturas...');
    const [invoices] = await sequelize.query(`
      INSERT INTO invoices ("rifEmisor", "razonSocialEmisor", "rifReceptor", "razonSocialReceptor", 
                           "numeroControl", "numeroFactura", "subtotal", "iva", "total", "status")
      VALUES 
        ('J123456789', 'Mi Empresa C.A.', 'V987654321', 'Cliente Ejemplo 1', 
         'CTRL2024090001', 'F001-0000001', 200.00, 32.00, 232.00, 'procesada'),
        ('J123456789', 'Mi Empresa C.A.', 'J987654321', 'Cliente Ejemplo 2 S.A.', 
         'CTRL2024090002', 'F001-0000002', 150.00, 24.00, 174.00, 'pendiente')
      RETURNING id
    `);
    console.log('✅ Facturas insertadas');

    // 2. Insertar items
    console.log('📦 Insertando items...');
    await sequelize.query(`
      INSERT INTO invoice_items ("invoiceId", "descripcion", "cantidad", "precioUnitario", 
                                "alicuota", "impuesto", "total")
      VALUES 
        (${invoices[0].id}, 'Producto de Prueba A', 2.00, 50.00, 16.00, 16.00, 116.00),
        (${invoices[0].id}, 'Producto de Prueba B', 3.00, 33.33, 16.00, 16.00, 116.00),
        (${invoices[1].id}, 'Servicio de Consultoría', 5.00, 30.00, 16.00, 24.00, 174.00)
    `);
    console.log('✅ Items de factura insertados');

    // 3. Verificar datos
    console.log('🔍 Verificando datos...');
    const [invoiceCount] = await sequelize.query('SELECT COUNT(*) FROM invoices');
    const [itemCount] = await sequelize.query('SELECT COUNT(*) FROM invoice_items');
    
    console.log(`📊 ${invoiceCount[0].count} facturas creadas`);
    console.log(`📦 ${itemCount[0].count} items creados`);
    console.log('🎉 ¡Datos de prueba insertados correctamente!');

  } catch (error) {
    console.error('❌ Error insertando datos:', error.message);
  }
};

seedData();