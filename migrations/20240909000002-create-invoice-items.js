'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'invoices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      precioUnitario: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      alicuota: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 16
      },
      impuesto: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      }
    });

    // Agregar índices
    await queryInterface.addIndex('invoice_items', ['invoiceId']);
    await queryInterface.addIndex('invoice_items', ['codigo']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_items');
  }
};