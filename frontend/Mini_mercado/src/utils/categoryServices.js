import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
})

export const categoryService = {
    async getCategories() {
        try {
        const res = await api.get('/category/')
        return res.data
        } catch (error) {
        console.error('Error al obtener categorías:', error)
        return false
        }
    },

    async createCategory(data) {
        try {
        const res = await api.post('/category/', data)
        return res.data
        } catch (error) {
        console.error('Error al crear categoría:', error)
        return false
        }
    },

    async updateCategory(id, data) {
        try {
        const res = await api.put(`/category/${id}`, data)
        return res.data
        } catch (error) {
        console.error('Error al actualizar categoría:', error)
        return false
        }
    },

    async patchCategory(id, data) {
        try {
        const res = await api.patch(`/category/${id}`, data)
        return res.data
        } catch (error) {
        console.error('Error al hacer patch a la categoría:', error)
        return false
        }
    },

    async deleteCategory(id) {
        try {
        const res = await api.delete(`/category/${id}`)
        return res.data
        } catch (error) {
        console.error('Error al eliminar categoría:', error)
        return false
        }
    },
}