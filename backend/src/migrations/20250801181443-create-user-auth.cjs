'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('password_recovery', {
      recovery_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // puedes cambiar a 'RESTRICT' si prefieres no eliminar en cascada
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Índice único sobre token
    await queryInterface.addIndex('password_recovery', ['token'], {
      unique: true,
      name: 'idx_password_recovery_token_unique'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('password_recovery', 'idx_password_recovery_token_unique');
    await queryInterface.dropTable('password_recovery');
  }
};
