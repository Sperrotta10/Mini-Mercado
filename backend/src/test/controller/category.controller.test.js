import { testCRUDMethod } from "../utils/testCRUDController.js"
import { CategoryController } from "../../modules/category/controller/category.js"
import { describe, it, expect, vi } from 'vitest'

describe("CategoryController (hereda de BaseController)", () => {
    const controller = new CategoryController();

    describe("getAll()", () => {
        it("debería retornar 200 y lista de categorías", async () => {
            const mockData = {
                status: 200,
                message: "Categorías obtenidas",
                data: [{ name: "Electronics" }]
            };

            await testCRUDMethod({
                controller,
                method: "getAll",
                modelMock: { getAll: vi.fn().mockResolvedValue(mockData) },
                expectedStatus: 200,
                expectedJson: {
                    message: "Categorías obtenidas",
                    data: mockData.data
                }
            });
        });
    });

    describe("getId()", () => {
        it("debería retornar 200 y categoría por ID", async () => {
            const mockData = {
                status: 200,
                message: "Categoría obtenida",
                data: { id: 1, name: "Electronics" }
            };

            await testCRUDMethod({
                controller,
                method: "getId",
                modelMock: { getId: vi.fn().mockResolvedValue(mockData) },
                req: { params: { id: 1 } },
                expectedStatus: 200,
                expectedJson: {
                    message: "Categoría obtenida",
                    data: mockData.data
                }
            });
        });
    });

    describe("create()", () => {
        it("debería retornar 201 al crear una categoría", async () => {
            const mockData = {
                status: 201,
                message: "Categoría creada",
                data: { id: 1, name: "Electronics" }
            };

            await testCRUDMethod({
                controller,
                method: "create",
                modelMock: { create: vi.fn().mockResolvedValue(mockData) },
                req: { body: { name: "Electronics" } },
                expectedStatus: 201,
                expectedJson: {
                    message: "Categoría creada",
                    data: mockData.data
                }
            });
        });
    });

    describe("update()", () => {
        it("debería retornar 200 al actualizar una categoría", async () => {
            const mockData = {
                status: 200,
                message: "Categoría actualizada",
                data: { id: 1, name: "Electronics Updated" }
            };

            await testCRUDMethod({
                controller,
                method: "update",
                modelMock: { update: vi.fn().mockResolvedValue(mockData) },
                req: { params: { id: 1 }, body: { name: "Electronics Updated" } },
                expectedStatus: 200,
                expectedJson: {
                    message: "Categoría actualizada",
                    data: mockData.data
                }
            });
        });
    });

    describe("delete()", () => {
        it("debería retornar 200 al eliminar una categoría", async () => {
            const mockData = {
                status: 200,
                message: "Categoría eliminada",
                data: { id: 1, name: "Electronics" }
            };
            await testCRUDMethod({
                controller,
                method: "delete",
                modelMock: { delete: vi.fn().mockResolvedValue(mockData) },
                req: { params: { id: 1 } },
                expectedStatus: 200,
                expectedJson: {
                    message: "Categoría eliminada",
                    data: mockData.data
                }
            });
        });
    });

});