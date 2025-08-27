'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      rol_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    // Agregar índice único en el campo `name`
    await queryInterface.addIndex('roles', ['name'], {
      unique: true,
      name: 'roles_name_unique'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('roles', 'roles_name_unique');
    await queryInterface.dropTable('roles');
  }
};
