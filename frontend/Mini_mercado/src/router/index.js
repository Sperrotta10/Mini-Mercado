import Pagina_principal from '@/views/home/view/pagina_principal.vue'
import pagina_404 from '@/views/pagina_404/pagina_404.vue'
import login_usuarios from '@/modules/login_usuarios.vue'
import pagina_administrador from '@/views/admin/view/pagina_administrador.vue'
import pagina_usuario from '@/views/usuarios/view/pagina_usuario.vue'
import Detalles_producto from '@/views/home/components/Detalles_producto.vue'
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
      name: 'Pagina de Login usuario', //Esto hasta momento es demo
      component: login_usuarios
    },
    {
      path: '/administrador',
      name: 'administrador', //Esto hasta momento es demo
      component: pagina_administrador
    },
    {
      path: '/usuario',
      name: 'Pagina de Usuario', //Esto hasta momento es demo
      component: pagina_usuario
    },
    {
      //Ahora, modificando al ruta dinamicamente
      path: '/producto_detalles/:nombre',
      name: 'Pagina de producto detalle', //Esto hasta momento es demo
      component: Detalles_producto
    }
  ],
})

export default router
