import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

Vue.use(Router)

const Login = () => import('./views/Login.vue')
const LoginCallback = () => import('./views/oidc/Login.vue')
const LogoutCallback = () => import('./views/oidc/Logout.vue')
const Empty = () => import('./views/Empty.vue')
const PetList = () => import('./views/pet/List.vue')
const PetCreate = () => import('./views/pet/Create.vue')
const PetFocus = () => import('./views/pet/Focus.vue')
const PetDetails = () => import('./views/pet/Details.vue')
const About = () => import('./views/About.vue')

const authGuard = (to, from, next) => {
  if (Store.state.auth.user !== null) next()
  else Store.dispatch('auth/login')
}

const unknownGuard = (to, from, next) => {
  if (Store.state.auth.user !== null) next({ name: 'login' })
  else next()
}

const canAccessToItem = (id) => {
  return Store.getters['pet/getItem'](id) !== undefined
}

const canAccessToItemGuard = (to, from, next) => {
  if (Store.state.auth.user === null) next({ name: 'login' })
  if (!canAccessToItem(to.params.id)) next({ name: 'empty' })
  next()
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index.html',
      alias: '/',
      name: 'empty',
      component: Empty,
      beforeEnter: authGuard
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: authGuard
    },
    {
      path: '/pet/create',
      name: 'pet-create',
      component: PetCreate,
      beforeEnter: authGuard
    },
    {
      path: '/pet/list',
      name: 'pet-list',
      component: PetList,
      beforeEnter: authGuard
    },
    {
      path: '/pet/focus/:id',
      name: 'pet-focus',
      component: PetFocus,
      beforeEnter: canAccessToItemGuard,
      props: true
    },
    {
      path: '/pet/details/:id',
      name: 'pet-details',
      component: PetDetails,
      beforeEnter: canAccessToItemGuard,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: unknownGuard
    },
    {
      path: '/oidc/login',
      name: 'oidc-login-callback',
      component: LoginCallback
    },
    {
      path: '/oidc/logout',
      name: 'oidc-logout-callback',
      component: LogoutCallback
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: () => {
        Store.dispatch('auth/logout')
      }
    }
  ]
})
