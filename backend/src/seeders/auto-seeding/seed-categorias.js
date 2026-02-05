import { Category } from '../../models/index.js';

const supabaseBaseUrl = (process.env.SUPABASE_PUBLIC_BASE_URL || process.env.SUPABASE_URL || '').replace(/\/$/, '');

function supabasePublicObjectUrl(bucket, objectPath) {
  if (!supabaseBaseUrl) return '';
  const cleanPath = String(objectPath || '').replace(/^\//, '');
  return `${supabaseBaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

const imageCategory = {
  imgLacteos: supabasePublicObjectUrl('category-images', 'category/1753574219176_lacteos.jpg'),
  imgFrutasVerduras: supabasePublicObjectUrl('category-images', 'category/1753574319538_frutas_y_verduras.webp'),
  imgCarniceria: supabasePublicObjectUrl('category-images', 'category/1753574403116_carne.jpg'),
  imgAbarrotes: supabasePublicObjectUrl('category-images', 'category/1753574446080_abarrotes.jpg'),
  imgBebidas: supabasePublicObjectUrl('category-images', 'category/1753574471691_refresco.jpg'),
  imgSnacksDulces: supabasePublicObjectUrl('category-images', 'category/1753574496351_chucheria.jpg'),
  imgLimpieza: supabasePublicObjectUrl('category-images', 'category/1753581692754_limpieza2.jpg')
}

export async function seedCategories() {

  try {
    const categories = [{ name : 'Lácteos', image : imageCategory.imgLacteos}, { name : 'Frutas y Verduras', image : imageCategory.imgFrutasVerduras}, { name : 'Carnicería', image : imageCategory.imgCarniceria}, { name : 'Abarrotes', image : imageCategory.imgAbarrotes}, { name : 'Bebidas', image : imageCategory.imgBebidas}, { name : 'Snacks y Dulces', image : imageCategory.imgSnacksDulces}, { name : 'Limpieza', image : imageCategory.imgLimpieza}];
    for (const { name, image } of categories) {
      await Category.findOrCreate({ where: { name }, defaults: { image } });
    }

    console.log("✅ Categorías seed cargadas correctamente.");
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
    
  }
}
