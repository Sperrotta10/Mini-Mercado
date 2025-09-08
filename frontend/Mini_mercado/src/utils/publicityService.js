import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
})

export const publicityService = {
  async getPublicities() {
    try {
      const res = await api.get('/publicity/')
      return res.data
    } catch (error) {
      console.error('Error al obtener publicidades:', error)
      return false
    }
  },

  async createPublicity(data) {
    try {
      const res = await api.post('/publicity/', data)
      return res.data
    } catch (error) {
      console.error('Error al crear publicidad:', error)
      return false
    }
  },

  async deletePublicity(id) {
    try {
      const res = await api.delete(`/publicity/${id}`)
      return res.data
    } catch (error) {
      console.error('Error al eliminar publicidad:', error)
      return false
    }
  },

  async getPublicityById(id) {
    try {
      const res = await api.get(`/publicity/${id}`)
      return res.data
    } catch (error) {
      console.error('Error al obtener publicidad por ID:', error)
      return false
    }
  },
}