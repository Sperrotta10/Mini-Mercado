import { api } from './api'

export class ProductService {
    // Constructor para inicializar la instancia de axios
    constructor() {
        this.api = api
    }

    async getProducts() {
        try {
            const res = await this.api.get('/product/')
            return res.data
        } catch (error) {
            console.error('Error al obtener productos:', error)
            return false
        }
    }

    async createProduct(data) {
        try {
            const res = await this.api.post('/product/', data)
            return res.data
        } catch (error) {
            console.error('Error al crear producto:', error)
            return false
        }
    }

    async getProductById(id) {
        try {
            const res = await this.api.get(`/product/${id}`)
            return res.data
        } catch (error) {
            console.error('Error al obtener producto por ID:', error)
            return false
        }
    }

    async patchProduct(id, data) {
        try {
            const res = await this.api.patch(`/product/${id}`, data)
            return res.data
        } catch (error) {
            console.error('Error al hacer patch al producto:', error)
            return error.response
        }
    }

    async deleteProduct(id) {
        try {
            const res = await this.api.delete(`/product/${id}`)
            return res.data
        } catch (error) {
            console.error('Error al eliminar producto:', error)
            return false
        }
    }

    async getProductsPaginated(page, limit, minPrice,maxPrice,minOferta,categoria) {
        try {
            const res = await this.api.get('/product/pagination', { params: { page, limit, minPrice,maxPrice,minOferta,categoria } })
            return res.data
        } catch (error) {
            console.error('Error al obtener productos paginados:', error)
            return false
        }
    }

    async getProductsByName(name){
        try{
            const res = await this.api.get(`/product/search/${name}`)
            return res.data
        }catch (error) {
            console.error('Error al obtener productos por nombre:', error)
            return false
        }
    }
}