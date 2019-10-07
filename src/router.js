import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

Vue.use(Router)

const Empty = () => import('./views/Empty.vue')
const PetList = () => import('./views/pet/List.vue')
const PetCreate = () => import('./views/pet/Create.vue')
const PetFocus = () => import('./views/pet/Focus.vue')
const PetDetails = () => import('./views/pet/Details.vue')
const About = () => import('./views/About.vue')

const canAccessToItem = (id) => {
  return Store.getters['pet/getItem'](id) !== undefined
}

const canAccessToItemGuard = (to, from, next) => {
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
      component: Empty
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/pet/create',
      name: 'pet-create',
      component: PetCreate
    },
    {
      path: '/pet/list',
      name: 'pet-list',
      component: PetList
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
    }
  ]
})
