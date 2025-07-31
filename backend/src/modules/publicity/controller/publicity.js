import { ModelPublicity } from "../model/publicity.js";
import { BaseController } from "../../../controller/controller.js";
import { isImageFile } from "../../../helpers/images.js"
import { validateParamsId } from "../../../helpers/params_id.js";
import { errorUploadImage } from "../../../helpers/upload_image.js"
import { uploadImage, extractPathFromUrl, deleteFile } from "../../../utils/images.js"

export class PublicityController extends BaseController {

    constructor() {
        super(ModelPublicity);
    }


    create = async (req, res) => {

        const image = req.files.image;

        if (!image) return res.status(400).json({ message: "Image is required" });

        const imageValidation = isImageFile(image);
        if (!imageValidation.success) return res.status(imageValidation.status).json({ message: imageValidation.message });
        
        const BUCKET = "publicity-images";
        const FOLDER = "publicity";
        let filePath = null;

        try {

            // Upload image to Supabase
            const imageUrl = await uploadImage(image, FOLDER, BUCKET);
            if (!imageUrl) return res.status(500).json({ message: "Error uploading image" });

            // Extract file path from the image URL
            filePath = extractPathFromUrl(imageUrl);

            const newPublicity = await this.model.create({ image: imageUrl });

            if (!newPublicity) {
                await errorUploadImage(filePath, BUCKET);
                return res.status(500).json({ message: "Error creating publicity" });
            }

            res.status(201).json({ message: newPublicity.message, data: newPublicity.data });

        } catch (error) {

            // If an error occurs, revert the image upload
            await errorUploadImage(filePath, BUCKET);

            res.status(500).json({ message: error.message });
        }
    }

    update = async (req, res) => {

        const { id } = req.params;
        const isValidId = validateParamsId({ id });
        if (!isValidId.success) return res.status(400).json({ message: "ID de publicidad inválido", error: isValidId.error.errors });

        const image = req.files?.image;

        if (!image) return res.status(400).json({ message: "Image is required" });

       
        const imageValidation = isImageFile(image);
        if (!imageValidation.success) return res.status(imageValidation.status).json({ message: imageValidation.message });
        
        const BUCKET = "publicity-images";
        const FOLDER = "publicity";
        let filePath = null;
        let imageUrl = null;

        try {

            const publicity = await this.model.getId(id);
            if (publicity.status !== 200) return res.status(publicity.status).json({ message: publicity.message });

            const oldImage = extractPathFromUrl(publicity.data.image);

            if (image) {

                // Upload new image to Supabase
                imageUrl = await uploadImage(image, FOLDER, BUCKET);
                if (!imageUrl) return res.status(500).json({ message: "Error uploading image" });

                filePath = extractPathFromUrl(imageUrl);
            }

            // Update publicity with new image path
            const updatedPublicity = await this.model.update(id, { image: imageUrl });

            // If the update fails, revert the image upload
            if (updatedPublicity.status !== 200) {
                if (filePath) await errorUploadImage(filePath, BUCKET);
                return res.status(updatedPublicity.status).json({ message: updatedPublicity.message });
            }

            // If the update is successful, delete the old image
            if (oldImage) {
                await deleteFile(oldImage, BUCKET);
            }

            res.status(updatedPublicity.status).json({ message: updatedPublicity.message, data: updatedPublicity.data });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}