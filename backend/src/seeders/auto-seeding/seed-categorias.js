import { Category } from '../../models/index.js';

const imageCategory = {
  imgLacteos: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574219176_lacteos.jpg",
  imgFrutasVerduras: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574319538_frutas_y_verduras.webp",
  imgCarniceria: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574403116_carne.jpg",
  imgAbarrotes: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574446080_abarrotes.jpg",
  imgBebidas: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574471691_refresco.jpg",
  imgSnacksDulces: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753574496351_chucheria.jpg",
  imgLimpieza: "https://mkxlawuamztbmwbfxugr.supabase.co/storage/v1/object/public/category-images/category/1753581692754_limpieza2.jpg"
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
