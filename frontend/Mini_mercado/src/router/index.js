import Pagina_principal from '@/views/home/view/pagina_principal.vue'
import pagina_404 from '@/views/pagina_404/pagina_404.vue'
import login_usuarios from '@/modules/login_usuarios.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pagina_principal,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: pagina_404
    },
    {
      path: '/login',
      name: 'Login_usuario', //Esto hasta momento es demo
      component: login_usuarios
    }
  ],
})

export default router
