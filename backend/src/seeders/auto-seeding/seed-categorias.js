import { Category } from '../../models/index.js';

export async function seedCategories() {
  const categories = ['Lácteos', 'Frutas y Verduras', 'Carnicería', 'Abarrotes', 'Bebidas', 'Snacks y Dulces', 'Limpieza'];
  for (const name of categories) {
    await Category.findOrCreate({ where: { name } });
  }
}
