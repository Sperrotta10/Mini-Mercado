import { Publicity } from "../../../models/index.js";
import { deleteFile, extractPathFromUrl } from "../../../utils/images.js";

export class ModelPublicity {

    static async create(data) {

        try {

            const publicity = await Publicity.create(data);
            return {message: "Publicity created successfully", data:publicity, status: 201};

        } catch (error) {
            throw new Error(`Error creating publicity: ${error.message}`);
        }
    }

    static async getAll() {

        try {

            const publicities = await Publicity.findAll();
            return {message: "Publicities retrieved successfully", data: publicities, status: 200};

        } catch (error) {
            throw new Error(`Error retrieving publicities: ${error.message}`);
        }
    }

    static async getId(id) {

        try {

            const publicity = await Publicity.findByPk(id);

            if (!publicity) return {message: "Publicity not found", status: 404};

            return {message: "Publicity retrieved successfully", data : publicity, status: 200};

        } catch (error) {
            throw new Error(`Error retrieving publicity: ${error.message}`);
        }
    }

    static async update(id, data) {

        try {

            const publicity = await Publicity.findByPk(id);

            if (!publicity) return {message: "Publicity not found", status: 404};

            await publicity.update(data);
            return {message: "Publicity updated successfully", status: 200};

        } catch (error) {
            throw new Error(`Error updating publicity: ${error.message}`);
        }
    }

    static async delete(id) {

        try {

            const BUCKET = "publicity-images";

            const publicityExists = await Publicity.findByPk(id);

            if (!publicityExists) return {message: "Publicity not found", status: 404};

            const deleted = await Publicity.destroy({ where: { publicity_id : id } });

            if (deleted === 0) return { message: "Publicity not found", status: 404 };

            if (publicityExists.image) {
                const filePath = extractPathFromUrl(publicityExists.image);
                if (!filePath) {
                    throw new Error("Error extracting image path from publicity");
                }
                await deleteFile(filePath, BUCKET);
            }

            return {message: "Publicity deleted successfully", status: 200};

        } catch (error) {
            throw new Error(`Error deleting publicity: ${error.message}`);
        }
    }
}