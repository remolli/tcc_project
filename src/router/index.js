import Vue from 'vue'
import VueRouter from 'vue-router'
import Guard from '@/service/middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/HomeView.vue')
  },
  {
    path: '/sobre',
    name: 'about',
    component: () => import('../views/about/AboutView.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/feedback/FeedbackView.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: Guard.redirectIfAuthenticated,
    component: () => import('../views/auth/login/LoginView.vue')
  },
  {
    path: '/cadastro',
    name: 'register',
    beforeEnter: Guard.redirectIfAuthenticated,
    component: () => import('../views/auth/register/RegisterPage.vue')
  },
  {
    path: '/recuperar',
    name: 'recover',
    beforeEnter: Guard.redirectIfAuthenticated,
    component: () => import('../views/auth/recover/RecoverPage.vue')
  },
  {
      path: '*',
      redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
