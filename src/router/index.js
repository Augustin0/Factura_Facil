import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
 

{
path:"/impresion/:id",
name:"impresion",
component:()=>import('../views/Impresion.vue')
},
  {

    path: '/menu',
    name: 'menu',
    component: () => import('../views/menu.vue'),

    

    children: [
      {
        path: '/clientes/:id',
        name: 'login',
        component: () => import('../views/clientes.vue')
      },
      {
        path: '/clientes',
        component: () => import('../views/clientes.vue'),
        name: 'clientes'
      },
    {
      path: '/agregar',
      name: 'agregar',
      component: () => import('../views/agregar.vue')
    },
    {
      path: '/formFactura/:id',
      component: () => import('../views/formFactura.vue'),
      name: 'formFactura' },
    {
      path: '/Facturas/:id',
      component: () => import('../views/Facturas.vue'),
      name: 'Facturas' },
      {
        path: '/modificar/:id',
        component: () => import('../views/modificar.vue'),
        name: 'modificar'},
        {
          path: '/helpPage',
          name: 'helpPage',
          component: () => import('../views/helPage.vue')
        
          }
        
      

    ],
  },

  

  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
