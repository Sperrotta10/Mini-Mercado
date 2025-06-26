import { supabase } from '../config/supaBase.js';
import { Product } from "../models/index.js";

export const uploadImage = async (file) => {
  try {
    // 1. Define la ruta (usamos timestamp para evitar duplicados)
    const filePath = `productos/${Date.now()}_${file.name}`;

    // 2. Sube la nueva imagen
    const { error } = supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) throw error;

    // 3. Obtén URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;

  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    throw error; // Puedes manejar esto en tu UI
  }
};

export const deleteFile = async (filePath) => {
  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);

  if (error) throw error;
};

// Helper para extraer la ruta del archivo desde una URL de Supabase
const extractPathFromUrl = (url) => {
  const matches = url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
  return matches ? matches[1] : null;
};

const isSupabaseUrl = (url) => {
      return url.includes('supabase.co/storage');
};

export const updateProductImage = async (newImage, oldImageUrl, product_id) => {
  try {
    // 1. Extrae la ruta del archivo antiguo desde la URL
    const oldFilePath = extractPathFromUrl(oldImageUrl);

    // 2. Sube la nueva imagen
    const { newUrl } = await uploadImage(newImage);

    // 3. Actualiza MySQL (ejemplo con un ORM como Sequelize)
    await Product.update(
      { image: newUrl },
      { where: { product_id } }
    );

    // 4. Elimina la imagen antigua (opcional)
    if (oldFilePath && isSupabaseUrl(oldImagePath)) {
      await deleteFile('product-images', oldFilePath);
    }

    return newUrl;

  } catch (error) {
    console.error('Error en updateProductImage:', error);
    throw error;
  }
};