import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/LoginPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})