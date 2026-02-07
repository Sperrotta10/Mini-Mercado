import { api } from './api'

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

    async login(data) {
        try {
            const res = await this.api.post('/auth/login/', data)
            return {status:true, data: res.data}
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            return {status:false, data: error.status}
        }
    }

    async logout() {
        try {
        const res = await api.post('/auth/logout', {})
        if (res.status === 200) return true
        } catch (error) {
        const status = error?.response?.status
        // Si no hay sesión/cookie, consideramos el logout como "ok" (no-op)
        if (status === 401 || status === 403) return true
        console.error('Error al cerrar sesión:', error)
        }
        return false
    }

    async getSectionId(){
        try {
        const res = await api.get('/auth/me')
        if (res.status === 200) {
            return { status: true, data: res.data.data }
        }
        } catch (error) {
        const status = error?.response?.status
        // 401/403 es un caso normal: usuario no autenticado
        if (status === 401 || status === 403) {
            return { status: false, code: status }
        }
        console.error('Error al obtener sección por ID:', error)
        return { status: false, code: status }
        }
        return { status: false }
    }

    async getUserByID(id) {
        try {
            const res = await this.api.get(`/register/${id}`)
            if (res.status === 200) {
                return { status: true, data: res.data.data }
            }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error)
            return false
        }
        return false
    }

    async updateUser(id, data) {
        try {
            const res = await this.api.patch(`/register/${id}`, data)
            if (res.status === 200) {
                return { status: true, data: res.data.data }
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error)
            return false
        }
        return false
    }

    async getAll(){
        try {
            const res = await this.api.get('/register/')
            if (res.status === 200) {
                return { status: true, data: res.data.data }
            }
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error)
            return false
        }
        return false
    }

    async createEmpleado(data) {
        try {
            const res = await this.api.post('/register/admin-create', data)
            return res.data
        } catch (error) {
            console.error('Error al crear empleado:', error)
            return false
        }
    }

    async getCartsByCedula(cedula){
        try{
            const res = await this.api.get(`/register/cedula/${cedula}`)
            if (res.status === 200) {
                return { status: true, data: res.data.data }
            }
        } catch(error){
            console.error('Error al obtener carritos del usuario', error)
            return false
        }
    }

    async forgotPassword(email){
        try {
            const res = await this.api.post('/auth/forgot-password', { email })
            return { status: true, data: res.data.data }
        } catch (error) {
            console.error('Error al enviar correo de recuperación:', error)
            return error.response
        }
    }

}