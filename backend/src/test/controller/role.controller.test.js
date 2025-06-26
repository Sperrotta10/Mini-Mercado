import { describe, it, expect, vi } from 'vitest'
import { RoleController } from '../../modules/role/controller/role.js'
import { testCRUDMethod } from '../utils/testCRUDController.js'

describe('RoleController (hereda de BaseController)', () => {
    const controller = new RoleController()

    describe('getAll()', () => {
        it('debería retornar 200 y lista de roles', async () => {
            const mockData = {
                status: 200,
                message: 'Roles obtenidos',
                data: [{ name: 'admin' }]
            }

            await testCRUDMethod({
                controller,
                method: 'getAll',
                modelMock: { getAll: vi.fn().mockResolvedValue(mockData) },
                expectedStatus: 200,
                expectedJson: {
                    message: 'Roles obtenidos',
                    data: mockData.data
                }
            })
        })
    })

    describe('getId()', () => {
        it('debería retornar 200 y rol por ID', async () => {
            const mockData = {
                status: 200,
                message: 'Rol obtenido',
                data: { id: 1, name: 'admin' }
            }

            await testCRUDMethod({
                controller,
                method: 'getId',
                modelMock: { getId: vi.fn().mockResolvedValue(mockData) },
                req: { params: { id: 1 } },
                expectedStatus: 200,
                expectedJson: {
                    message: 'Rol obtenido',
                    data: mockData.data
                }
            })
        })
    })

    describe('create()', () => {
        it('debería retornar 201 al crear un rol', async () => {
            const mockData = {
                status: 201,
                message: 'Rol creado',
                data: { id: 1, name: 'admin' }
            }

            await testCRUDMethod({
                controller,
                method: 'create',
                modelMock: { create: vi.fn().mockResolvedValue(mockData) },
                req: { body: { name: 'admin' } },
                expectedStatus: 201,
                expectedJson: {
                    message: 'Rol creado',
                    data: mockData.data
                }
            })
        })
    })

    describe('update()', () => {
        it('debería retornar 200 al actualizar un rol', async () => {
            const mockData = {
                status: 200,
                message: 'Rol actualizado',
                data: { id: 1, name: 'admin' }
            }

            await testCRUDMethod({
                controller,
                method: 'update',
                modelMock: { update: vi.fn().mockResolvedValue(mockData) },
                req: { params: { id: 1 }, body: { name: 'admin' } },
                expectedStatus: 200,
                expectedJson: {
                    message: 'Rol actualizado',
                    data: mockData.data
                }
            })
        })
    })

    describe('delete()', () => {
        it('debería retornar 200 al eliminar un rol', async () => {
            const mockData = {
                status: 200,
                message: 'Rol eliminado',
                data: null
            }

            await testCRUDMethod({
                controller,
                method: 'delete',
                modelMock: { delete: vi.fn().mockResolvedValue(mockData) },
                req: { params: { id: 1 } },
                expectedStatus: 200,
                expectedJson: {
                    message: 'Rol eliminado',
                    data: null
                }
            })
        })
    })
})
