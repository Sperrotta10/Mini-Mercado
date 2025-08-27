'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'rol_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cedula: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      suscripcion: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      subscription_started_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      subscription_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      image_perfil: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Índices únicos
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'idx_user_email_unique'
    });
    await queryInterface.addIndex('users', ['username'], {
      unique: true,
      name: 'idx_user_username_unique'
    });
    await queryInterface.addIndex('users', ['cedula'], {
      unique: true,
      name: 'idx_user_cedula_unique'
    });
    await queryInterface.addIndex('users', ['googleId'], {
      unique: true,
      name: 'idx_user_googleId_unique'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', 'idx_user_email_unique');
    await queryInterface.removeIndex('users', 'idx_user_username_unique');
    await queryInterface.removeIndex('users', 'idx_user_cedula_unique');
    await queryInterface.removeIndex('users', 'idx_user_googleId_unique');
    await queryInterface.dropTable('users');
  }
};
