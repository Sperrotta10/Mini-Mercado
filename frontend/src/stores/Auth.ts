import { defineStore } from 'pinia'
import { UserService } from '@/utils/userServices.js'

const userService = new UserService()
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null') as null | { user_id: string; user_name: string, email: string; role: string },
        loading: false,
        userData: null as null,
    }),

    actions: {
        async login(data: { email: string; password: string }) {
            this.loading = true
            try {
                const res = await userService.login(data)
                if (res && (res as any).ok === true) {
                    const payload = (res as any).data?.data
                    this.user = payload
                        ? {
                              ...payload,
                              role: payload.role?.name || payload.role,
                          }
                        : null

                    if (this.user) {
                        localStorage.setItem('user', JSON.stringify(this.user))
                        await this.GetThisUserData();
                        return true
                    }
                    return { status: false, code: 500, data: { message: 'Respuesta inválida del servidor' } }
                }

                return {
                    status: false,
                    code: (res as any)?.status ?? null,
                    data: (res as any)?.data ?? null,
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
                if (res && res.status) {
                this.user = {
                    ...res.data,
                    role: res.data.role?.name || res.data.role,
                }
                localStorage.setItem('user', JSON.stringify(this.user))
                
                return true
                }
            } catch (e) {
                console.error('Session check error:', e)
                this.user = null
                localStorage.removeItem('user')
            }
            return false
        },

        async GetThisUserData() {
            try {
                if (!this.user?.user_id) {
                    const hasSession = await this.checkSession()
                    if (!hasSession || !this.user?.user_id) {
                        this.userData = null
                        return false
                    }
                }

                const res = await userService.getUserByID(this.user.user_id)
                if (res && res.status) {
                    this.userData = res.data
                    return res.data
                }
            } catch (e) {
                console.error('User data fetch error:', e)
                this.userData = null
            }
            return false
        }
    },

    getters: {
        isAuthenticated: (state) => !!state.user,
        isAdmin: (state) => state.user?.role === 'admin',
    },
})