import Pagina_principal from '@/views/home/view/pagina_principal.vue'
import pagina_404 from '@/views/pagina_404/pagina_404.vue'
import login_usuarios from '@/modules/login_usuarios.vue'
import pagina_administrador from '@/views/admin/view/pagina_administrador.vue'
import pagina_usuario from '@/views/usuarios/view/pagina_usuario.vue'
import Detalles_producto from '@/views/home/components/Detalles_producto.vue'
import BienvenidoComponente from '@/views/admin/components/BienvenidoComponente.vue'
import Gestion_inventario from '@/views/admin/components/GestionInventario.vue'
import Gestion_empleado from '@/views/admin/components/GestionEmpleado.vue'
import GestionPublicidad from '@/views/admin/components/GestionPublicidad.vue'
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
      component: pagina_administrador,
      children:[
        {path:'', name:'Bienvenido',component:BienvenidoComponente},
        {path:'gestion_inventario', name:'Gestion_Inventario',component:Gestion_inventario, meta: { title: 'Gestión de Inventario' }},
        {path:'gestion_empleado', name:'Gestion_Empleado',component:Gestion_empleado, meta: { title: 'Gestión de Empleados' }},
        {path:'gestion_publicidad', name:'Gestion_Publicidad',component:GestionPublicidad, meta: { title: 'Gestión de Publicidad' }}
      ]
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
