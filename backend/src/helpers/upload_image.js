import { deleteFile } from "../utils/images.js";

export async function errorUploadImage(filePath, BUCKET) {

    if (filePath) {
        // si hubo un error al subir la imagen, eliminar la imagen subida
        try {
            await deleteFile(filePath, BUCKET);
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
        }
    }
    
}