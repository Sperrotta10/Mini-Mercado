import { supabase } from '../config/supaBase.js';
//import { Product } from "../models/index.js";

export const uploadImage = async (file, folder, bucket) => {
  try {
    // 1. Define la ruta (usamos timestamp para evitar duplicados)
    const filePath = `${folder}/${Date.now()}_${file.name}`;

    // 2. Sube la nueva imagen
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.data, {
        contentType: file.mimetype,
        upsert: true // Permite sobrescribir archivos con el mismo nombre
      });

    if (error) throw error;

    // 3. Obtén URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;

  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    throw error; // Puedes manejar esto en tu UI
  }
};

export const deleteFile = async (filePath, bucket) => {

  try {

    if (!filePath) {
      throw new Error("No se proporcionó una ruta de archivo válida");
    }

    // 2. Elimina la imagen antigua (opcional)
    if (isSupabaseUrl(filePath)) {
      const oldImagePath = extractPathFromUrl(filePath);

      const { error } = await supabase.storage
      .from(bucket)
      .remove([oldImagePath]);

      if (error) throw error;
    }
    
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
  }
  
};

// Helper para extraer la ruta del archivo desde una URL de Supabase
export const extractPathFromUrl = (url) => {
  const matches = url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
  return matches ? matches[1] : null;
};

const isSupabaseUrl = (url) => {
  return url.includes('supabase.co/storage');
};