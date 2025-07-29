import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
})

export class UserService {
    // Constructor para inicializar la instancia de axios
    constructor() {
        this.api = api
    }

    async createUser(data) {
        try {
            const res = await this.api.post('/register/', data)
            return res.data
        } catch (error) {
            console.error('Error al crear usuario:', error)
            return false
        }
    }

}