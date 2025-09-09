'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rifEmisor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[JGVEP][0-9]{8,9}$/i
        }
      },
      razonSocialEmisor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccionEmisor: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      telefonoEmisor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rifReceptor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[JGVEP][0-9]{8,9}$/i
        }
      },
      razonSocialReceptor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccionReceptor: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      telefonoReceptor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numeroControl: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      numeroFactura: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaEmision: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      fechaVencimiento: {
        type: Sequelize.DATE,
        allowNull: true
      },
      subtotal: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      iva: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0
      },
      total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      moneda: {
        type: Sequelize.ENUM('VES', 'USD', 'EUR'),
        defaultValue: 'VES'
      },
      tasaCambio: {
        type: Sequelize.DECIMAL(10, 4),
        defaultValue: 1
      },
      formaPago: {
        type: Sequelize.ENUM('contado', 'credito', 'transferencia', 'mixto'),
        defaultValue: 'contado'
      },
      plazoCredito: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pendiente', 'procesada', 'anulada', 'enviada_seniat'),
        defaultValue: 'pendiente'
      },
      codigoSeguridad: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pdfPath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      xmlPath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Agregar índices para mejor performance
    await queryInterface.addIndex('invoices', ['rifEmisor']);
    await queryInterface.addIndex('invoices', ['rifReceptor']);
    await queryInterface.addIndex('invoices', ['numeroControl']);
    await queryInterface.addIndex('invoices', ['numeroFactura']);
    await queryInterface.addIndex('invoices', ['fechaEmision']);
    await queryInterface.addIndex('invoices', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoices');
  }
};