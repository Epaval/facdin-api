const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rifEmisor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[JGVEP][0-9]{8,9}$/i
    }
  },
  razonSocialEmisor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rifReceptor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[JGVEP][0-9]{8,9}$/i
    }
  },
  razonSocialReceptor: DataTypes.STRING,
  numeroControl: {
    type: DataTypes.STRING,
    unique: true
  },
  numeroFactura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaEmision: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  subtotal: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  iva: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'procesada', 'anulada'),
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'invoices',
  timestamps: true
});

module.exports = Invoice;