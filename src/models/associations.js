const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');

// Configurar relaciones
Invoice.hasMany(InvoiceItem, {
  foreignKey: 'invoiceId',
  as: 'items',
  onDelete: 'CASCADE'
});

InvoiceItem.belongsTo(Invoice, {
  foreignKey: 'invoiceId',
  as: 'invoice'
});

// Sincronizar todos los modelos
const syncModels = async () => {
  try {
    await require('../config/database').sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('❌ Error sincronizando modelos:', error);
  }
};

module.exports = { syncModels };