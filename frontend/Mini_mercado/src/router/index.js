import Pagina_principal from '@/views/home/view/pagina_principal.vue'
import pagina_404 from '@/views/pagina_404/pagina_404.vue'
import login_usuarios from '@/modules/login_usuarios.vue'
import Detalles_producto from '@/views/home/components/Detalles_producto.vue'
import CrearUsuario from '@/modules/CrearUsuario.vue'

//Rutas para diferentes de user
import pagina_administrador from '@/views/admin/view/pagina_administrador.vue'
import pagina_usuario from '@/views/usuarios/view/pagina_usuario.vue'
import pagina_empleado from '@/views/empleado/view/pagina_empleado.vue'

//Componentes para Admin
import BienvenidoComponente from '@/views/admin/components/BienvenidoComponente.vue'
import Gestion_inventario from '@/views/admin/components/GestionInventario.vue'
import Gestion_empleado from '@/views/admin/components/GestionEmpleado.vue'
import GestionPublicidad from '@/views/admin/components/GestionPublicidad.vue'

//Componentes para Usuario
import BienvenidoUsuario from '@/views/usuarios/components/BienvenidoUsuario.vue'
import InformacionPersonal from '@/views/usuarios/components/InformacionPersonal.vue'
import GestionCarritos from '@/views/usuarios/components/GestionCarritos.vue'
import ConsultaDuda from '@/views/usuarios/components/ConsultaDuda.vue'
import EditarInformacion from '@/views/usuarios/components/EditarInformacion.vue'

//Componentes para Empleado
import BienvenidoEmpleado from '@/views/empleado/components/BienvenidoEmpleado.vue'
import ConsultaInventario from '@/views/empleado/components/ConsultaInventario.vue'
import AtencionClientePro from '@/views/empleado/components/AtencionClientePro.vue'


import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
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
      path: '/crear_usuario',
      name: 'Pagina de Crear usuario', //Esto hasta momento es demo
      component: CrearUsuario
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
      component: pagina_usuario,
      children:[
        {path:'', name:'BienvenidoUsuario',component:BienvenidoUsuario},
        {path:'informacion_personal', name:'InformacionPersonal',component:InformacionPersonal, meta: { title: 'Información Personal' }},
        {path:'gestion_carrito', name:'Gestion_Carrito',component:GestionCarritos, meta: { title: 'Gestión de Carritos' }},
        {path:'consulta', name:'Consulta',component:ConsultaDuda, meta: { title: 'Consulta' }},
        {path:'editar_informacion', name:'Editar_Informacion',component:EditarInformacion, meta: { title: 'Editar su información' }}
      ]
    },
    {
      path: '/empleado',
      name: 'Pagina de Empleado', //Esto hasta momento es demo
      component: pagina_empleado,
      children:[
        {path:'', name:'BienvenidoEmpleado',component:BienvenidoEmpleado},
        {path:'consulta_inventario', name:'ConsultaInventario',component:ConsultaInventario, meta: { title: 'Consulta al Inventario' }},
        {path:'atencion_cliente', name:'AtencionCliente',component:AtencionClientePro, meta: { title: 'Atención al Cliente Suscriptor' }}
      ]
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
