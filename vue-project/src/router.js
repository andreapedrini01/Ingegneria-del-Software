import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginWindow from './components/LoginWindow.vue'
import RegisterWindow from './components/RegisterWindow.vue'
import MainPage from './components/MainPage.vue';

const routes = [
  { path: '/', component: MainPage},
  { path: '/login', component: LoginWindow, name: 'LoginWindow'},
  {path: '/register', component: RegisterWindow, name: 'RegisterWindow'},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router