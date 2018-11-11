import Vue from 'vue'
import Router from 'vue-router'
const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

/** 
Layout 
  hidden: true,                                    No aparecera en el menu si es true.
  meta : {
    roles: ['admin','editor', 'authenticated']     Control de roles de la pagina.
    title: 'title'                                 Es el titulo que aparecesara en el menu.
    icon: 'svg-name'                               Icono que aparecera a un lado el titulo.
    noCache: true                                  La pagina no se almacenara en cache si es true.
  }
**/
import Layout from '../views/layout/Layout'


export const constantRouterMap = [
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { 
    path: '', 
    component: Layout,
    redirect: '/home',
    hidden: true,
    children:  [{
      path: 'home',
      component: _import('home/Home'),
      name: 'home',
      meta: { title: 'Home', icon: 'home'}
    }] 
  },
  { 
    path: '/about', 
    component: Layout,
    redirect: '/about/index',
    children: [{
      path: 'index',
      component: _import('about/About'),
      name: 'about',
      meta: { title: 'About', icon: 'about', noCache: false}
    }]
  },
  { 
    path: '/sugerencia', 
    component: Layout,
    redirect: '/sugerencia/index',
    hidden: true,
    children: [{
      path: 'index',
      component: _import('sugerencia/index'),
      name: 'sugerencia',
      meta: { title: 'Sugerencia', icon: 'sugerencia', noCache: true }
    }]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/enlace',
    component: Layout,
    redirect: '/enlace/publicar',
    name: 'Enlace',
    meta: {
      title: 'Enlaces',
      icon: 'enlace',
      roles: ['admin','editor']
    },
    children: [
      { path: 'publicar', component: _import('enlace/publicar'), name: 'publicar', meta: { title: 'Publicar' } },
      { path: 'editar/:id', component: _import('enlace/editar'), props: true, name: 'enlace_editar', hidden: true },
      { path: 'sugeridos', component: _import('enlace/sugerencias'), name: 'sugerencia_lista', meta: { title: 'Sugerencias' } },
      { path: 'sugerido/:id', component: _import('sugerencia/editar'), props: true, name: 'editar', hidden: true }
    ]
  },

  {
    path: '/usario',
    component: Layout,
    redirect: '/usuario/lista',
    name: 'usuario',
    meta: {
      title: 'usuario',
      icon: 'usuario',
      roles: ['admin']
    },
    children: [
      { path: 'lista', component: _import('usuario/lista'), name: 'usuarios', meta: { title: 'Usuarios' } },
      { path: 'info/:id', component: _import('usuario/info'), props: true, name: 'info_user', hidden: true }
    ]
  },

  { path: '*', redirect: '/404', hidden: true}

]