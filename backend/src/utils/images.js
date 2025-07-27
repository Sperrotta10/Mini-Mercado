import { supabase } from '../config/supaBase.js';
//import { Product } from "../models/index.js";

export const uploadImage = async (file, folder, bucket) => {
  try {

    if (!file) throw new Error("No se proporcionó un archivo válido");

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
    if (!filePath) throw new Error("No se proporcionó una ruta de archivo válida");

    let path = filePath;
    console.log("Ruta del archivo a eliminar:", path);
    // Si es una URL de Supabase, extrae la ruta interna
    if (isSupabaseUrl(filePath)) {
      path = extractPathFromUrl(filePath);
    }

    if (!path) throw new Error("No se pudo determinar la ruta interna del archivo");

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    console.log("Intentando eliminar archivo:", error);
    if (error) throw error;

    console.log(`Archivo eliminado correctamente: ${path}`);
  } catch (error) {
    console.error("Error al eliminar archivo:", error.message);
  }
  
};

// Helper para extraer la ruta del archivo desde una URL de Supabase
export const extractPathFromUrl = (url) => {
  const matches = url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
  return matches ? decodeURIComponent(matches[1]) : null;
};

const isSupabaseUrl = (url) => {
  return url.includes('supabase.co/storage');
};