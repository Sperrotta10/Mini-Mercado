import Pagina_principal from '@/views/home/view/pagina_principal.vue'
import pagina_404 from '@/views/pagina_404/pagina_404.vue'
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
    }
  ],
})

export default router
