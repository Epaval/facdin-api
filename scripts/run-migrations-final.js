const { sequelize } = require('../src/config/database');

console.log('🚀 Iniciando migraciones para FacDin...');

const runMigrations = async () => {
  try {
    // 1. Verificar conexión
    console.log('🔌 Verificando conexión a PostgreSQL...');
    await sequelize.authenticate();
    console.log('✅ Conectado a PostgreSQL en puerto 5433');

    // 2. Crear tabla invoices
    console.log('📋 Creando tabla invoices...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        "rifEmisor" VARCHAR(255) NOT NULL,
        "razonSocialEmisor" VARCHAR(255) NOT NULL,
        "rifReceptor" VARCHAR(255) NOT NULL,
        "razonSocialReceptor" VARCHAR(255) NOT NULL,
        "numeroControl" VARCHAR(255) UNIQUE,
        "numeroFactura" VARCHAR(255) NOT NULL,
        "fechaEmision" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "subtotal" DECIMAL(15,2) NOT NULL,
        "iva" DECIMAL(15,2) DEFAULT 0,
        "total" DECIMAL(15,2) NOT NULL,
        "status" VARCHAR(50) DEFAULT 'pendiente',
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla invoices creada');

    // 3. Crear tabla invoice_items
    console.log('📋 Creando tabla invoice_items...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS invoice_items (
        id SERIAL PRIMARY KEY,
        "invoiceId" INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
        "descripcion" VARCHAR(255) NOT NULL,
        "cantidad" DECIMAL(10,2) NOT NULL,
        "precioUnitario" DECIMAL(15,2) NOT NULL,
        "alicuota" DECIMAL(5,2) DEFAULT 16,
        "impuesto" DECIMAL(15,2) DEFAULT 0,
        "total" DECIMAL(15,2) NOT NULL
      )
    `);
    console.log('✅ Tabla invoice_items creada');

    // 4. Crear índices
    console.log('📊 Creando índices...');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_invoices_rif_emisor ON invoices("rifEmisor")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_invoices_rif_receptor ON invoices("rifReceptor")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_invoices_numero_control ON invoices("numeroControl")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices("status")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items("invoiceId")');
    console.log('✅ Índices creados');

    // 5. Verificar tablas
    console.log('🔍 Verificando tablas creadas...');
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📊 Tablas en la base de datos:');
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });

    console.log('🎉 ¡Migraciones completadas exitosamente!');
    console.log('💡 Puedes iniciar el servidor con: npm run dev');

  } catch (error) {
    console.error('❌ Error en migraciones:');
    console.error('Mensaje:', error.message);
    if (error.original) {
      console.error('Error original:', error.original.message);
    }
    process.exit(1);
  }
};

// Ejecutar
runMigrations();