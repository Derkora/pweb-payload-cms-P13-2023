import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/Category', name: 'Category', component: () => import('../views/Category.vue')},
    {path: '/ToDo', name: 'ToDo', component: () => import('../views/ToDo.vue')},
    {path: '/Log', name: 'Log', component: () => import('../views/Log.vue')},
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView},
  ]
})

export default router
