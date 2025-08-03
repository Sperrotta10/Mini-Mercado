'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      categoria_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
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
      },
    });

    // Agregar el índice único después de la creación de la tabla
    await queryInterface.addIndex('categories', ['name'], {
      unique: true,
      name: 'categories_name_unique_index',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('categories', 'categories_name_unique_index');
    await queryInterface.dropTable('categories');
  }
};
