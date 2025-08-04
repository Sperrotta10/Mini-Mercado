import { defineStore } from 'pinia'
import { UserService } from '@/utils/userServices.js'

const userService = new UserService()
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null') as null | { user_id: string; user_name: string, email: string; role: string },
        loading: false,
    }),

    actions: {
        async login(data: { email: string; password: string }) {
            this.loading = true
            try {
                const res = await userService.login(data)
                if (res && res.status) {
                this.user = {
                    ...res.data.data,
                    role: res.data.data.role?.name || res.data.data.role,
                }
                localStorage.setItem('user', JSON.stringify(this.user))
                return true
                }
            } catch (e) {
                console.error('Login error:', e)
            } finally {
                this.loading = false
            }
            return false
        },

        async logout() {
            await userService.logout()
            this.user = null
            localStorage.removeItem('user')
        },

        async checkSession() {
            try {
                const res = await userService.getSectionId()
                console.log('Session check response:', res)
                if (res && res.status) {
                this.user = {
                    ...res.data,
                    role: res.data.role?.name || res.data.role,
                }
                
                return true
                }
            } catch (e) {
                console.error('Session check error:', e)
                this.user = null
            }
            return false
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.user,
        isAdmin: (state) => state.user?.role === 'admin',
    },
})