import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import HomeView from '../views/HomeView.vue'
import ProtectedView from '../views/ProtectedView.vue'
import Protected2View from '../views/Protected2View.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/folder',
      name: 'home_folder',
      component: HomeView
    },
    {
      path: '/folder/sub_folder',
      name: 'home_folder_sub_folder',
      component: HomeView
    },
    {
      path: '/param/:id',
      name: 'param',
      component: HomeView
    },
    {
      path: '/param2/:id(\\d+)', /* Match only number */
      name: 'param2',
      component: HomeView
    },
    {
      path: '/protected_1',
      name: 'protected_1',
      component: ProtectedView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/protected_2',
      name: 'protected_2',
      component: Protected2View,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.requiresAuth)) {
    const auth_store = useAuthStore()
    const {  login_status } = storeToRefs(auth_store)
    console.log(login_status.value)
    if ( !login_status.value ) { //Is not logged in, go to Login Page
      next({ 
        name: 'login',
        path: '/login',
        replace: true
      })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router
