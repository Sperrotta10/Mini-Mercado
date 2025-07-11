'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Lácteos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Frutas y Verduras', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Carnicería', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Abarrotes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bebidas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Snacks y Dulces', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Limpieza', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
