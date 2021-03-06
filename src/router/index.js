import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Favourites from '../views/Favourites.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/spec/:id',
    name: 'Inner',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inner.vue')
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
