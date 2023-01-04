import { createRouter, createWebHistory } from 'vue-router'
import StartView from "../views/StartView.vue";
import UpdateItem from "../views/UpdateItemView.vue";
import UpdateCategory from "../views/UpdateCategoryView.vue";
import LogIn from "../views/LogInView.vue";
import Register from "../views/RegisterView.vue";
import Category from "../views/CategoryView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        }else {
          next('/login')
        }
      }
    },
    {
      path: '/Updateitem/:id',
      name: 'UpdateItem',
      component: UpdateItem,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        }else {
          next('/login')
        }
      }
    },
    {
      path: '/UpdateCategory/:id',
      name: 'UpdateCategory',
      component: UpdateCategory,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        }else {
          next('/login')
        }
      }
    },

 {
      path:'/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    }
   
  
  ]
})

export default router
