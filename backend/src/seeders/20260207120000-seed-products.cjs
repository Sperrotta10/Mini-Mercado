'use strict';

const fs = require('fs');
const path = require('path');

const supabaseBaseUrl = (process.env.SUPABASE_PUBLIC_BASE_URL || process.env.SUPABASE_URL || '').replace(/\/$/, '');

function rewriteSupabasePublicUrl(url) {
  if (!url) return url;
  if (!supabaseBaseUrl) return url;

  // Reescribe cualquier URL pública de Supabase manteniendo el bucket/path
  // Ej: https://oldref.supabase.co/storage/v1/object/public/product-images/productos/manzana.png
  const match = String(url).match(/\/storage\/v1\/object\/public\/(.+)$/);
  if (!match) return url;

  return `${supabaseBaseUrl}/storage/v1/object/public/${match[1]}`;
}

function getCategoryNameByLegacyId(legacyId) {
  const mapping = {
    1: 'Lácteos',
    2: 'Frutas y Verduras',
    3: 'Carnicería',
    4: 'Abarrotes',
    5: 'Bebidas',
    6: 'Snacks y Dulces',
    7: 'Limpieza'
  };
  return mapping[Number(legacyId)];
}

function loadProductsJson() {
  const jsonPath = path.resolve(__dirname, 'data', 'products.json');
  const raw = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(raw);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Verificar categorías existentes (requisito FK)
    const neededNames = [
      'Lácteos',
      'Frutas y Verduras',
      'Carnicería',
      'Abarrotes',
      'Bebidas',
      'Snacks y Dulces',
      'Limpieza'
    ];

    const [categories] = await queryInterface.sequelize.query(
      `SELECT categoria_id, name FROM categories WHERE name IN (${neededNames.map(() => '?').join(', ')});`,
      { replacements: neededNames }
    );

    const categoryIdByName = new Map(categories.map(c => [c.name, c.categoria_id]));
    const missingCategories = neededNames.filter(n => !categoryIdByName.has(n));
    if (missingCategories.length) {
      throw new Error(
        `Faltan categorías requeridas para sembrar productos: ${missingCategories.join(', ')}. ` +
        `Ejecuta primero el seeder de categorías (db:seed:all) o crea esas categorías.`
      );
    }

    // 2) Cargar productos desde JSON
    const products = loadProductsJson();
    if (!Array.isArray(products) || products.length === 0) {
      console.log('No hay productos en products.json, seeder no insertó nada.');
      return;
    }

    // 3) Evitar duplicados por nombre (si ya existen)
    const productNames = products.map(p => p.name).filter(Boolean);
    const [existingRows] = await queryInterface.sequelize.query(
      `SELECT name FROM products WHERE name IN (${productNames.map(() => '?').join(', ')});`,
      { replacements: productNames }
    );
    const existingNames = new Set(existingRows.map(r => r.name));

    // 4) Preparar rows
    const now = new Date();
    const rowsToInsert = [];

    for (const p of products) {
      if (!p?.name) continue;
      if (existingNames.has(p.name)) continue;

      const categoryName = getCategoryNameByLegacyId(p.categoria_id);
      if (!categoryName) {
        throw new Error(`Producto '${p.name}' tiene categoria_id desconocido: ${p.categoria_id}`);
      }

      const categoria_id = categoryIdByName.get(categoryName);

      rowsToInsert.push({
        name: p.name,
        image: rewriteSupabasePublicUrl(p.image) || '',
        price: p.price,
        stock: p.stock,
        stock_min: p.stock_min,
        oferta: p.oferta ?? 0,
        status: true,
        categoria_id,
        createdAt: now,
        updatedAt: now
      });
    }

    if (!rowsToInsert.length) {
      console.log('Todos los productos ya existen; no se insertó nada.');
      return;
    }

    await queryInterface.bulkInsert('products', rowsToInsert, {});
  },

  async down(queryInterface, Sequelize) {
    const products = loadProductsJson();
    const names = products.map(p => p.name).filter(Boolean);
    if (!names.length) return;

    await queryInterface.bulkDelete('products', { name: names }, {});
  }
};
