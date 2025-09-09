const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const InvoiceItem = sequelize.define('InvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  alicuota: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 16
  },
  impuesto: DataTypes.DECIMAL(15, 2),
  total: DataTypes.DECIMAL(15, 2)
}, {
  tableName: 'invoice_items',
  timestamps: false
});

module.exports = InvoiceItem;