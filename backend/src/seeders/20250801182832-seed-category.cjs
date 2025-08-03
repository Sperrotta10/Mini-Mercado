'use strict';

const imageCategory = {
  imgLacteos: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574219176_lacteos.jpg",
  imgFrutasVerduras: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574319538_frutas_y_verduras.webp",
  imgCarniceria: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574403116_carne.jpg",
  imgAbarrotes: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574446080_abarrotes.jpg",
  imgBebidas: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574471691_refresco.jpg",
  imgSnacksDulces: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574496351_chucheria.jpg",
  imgLimpieza: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753581692754_limpieza2.jpg"
}

const categories = [
  { name: 'Lácteos', image: imageCategory.imgLacteos },
  { name: 'Frutas y Verduras', image: imageCategory.imgFrutasVerduras },
  { name: 'Carnicería', image: imageCategory.imgCarniceria },
  { name: 'Abarrotes', image: imageCategory.imgAbarrotes },
  { name: 'Bebidas', image: imageCategory.imgBebidas },
  { name: 'Snacks y Dulces', image: imageCategory.imgSnacksDulces },
  { name: 'Limpieza', image: imageCategory.imgLimpieza }
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const existing = await queryInterface.sequelize.query(
      `SELECT name FROM categories WHERE name IN ('Lácteos', 'Frutas y Verduras', 'Carnicería', 'Abarrotes', 'Bebidas', 'Snacks y Dulces', 'Limpieza');`
    );

    if (existing[0].length === 0) {
      await queryInterface.bulkInsert('categories', [
        ...categories.map(category => ({
          name: category.name,
          image: category.image,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
       name: [
        'Lácteos',
        'Frutas y Verduras',
        'Carnicería',
        'Abarrotes',
        'Bebidas',
        'Snacks y Dulces',
        'Limpieza'
      ]
    }, {});
  }
};
