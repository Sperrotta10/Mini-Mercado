
export function isImageFile(image) {

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.mimetype)) {
        return { message: "Formato de imagen no válido. Usa JPG, PNG o WEBP", status: 400, success: false };
    }

    const maxSizeMB = 2;
    if (image.size > maxSizeMB * 1024 * 1024) {
        return res.status(400).json({ message: `La imagen no debe superar los ${maxSizeMB}MB`, status: 400, success: false });
    }

    return { message: "Imagen válida", status: 200, success: true };
}