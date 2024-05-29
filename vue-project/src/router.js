import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginWindow from './components/LoginWindow.vue'
import RegisterWindow from './components/RegisterWindow.vue'
import MainPage from './components/MainPage.vue';
import passwordReset from './components/passwordReset.vue';
import RequestNewPwd from './components/RequestNewPwd.vue';
import UserProfile from './components/UserProfile.vue';
import Gruppi from './components/Gruppi.vue';
import GestisciGruppo from './components/GestisciGruppo.vue';

const routes = [
  { path: '/', component: MainPage},
  { path: '/login', component: LoginWindow, name: 'LoginWindow'},
  {path: '/register', component: RegisterWindow, name: 'RegisterWindow'},
  {path: '/passwordReset', component: passwordReset, name: 'passwordReset'},
  {path: '/requestNewPwd', component: RequestNewPwd, name: 'RequestNewPwd'},
  {path: '/userProfile', component: UserProfile, name: 'UserProfile'},
  {path: '/gruppi', component: Gruppi, name: 'Gruppi'},
  {path: '/gestisciGruppo', component: GestisciGruppo, name: 'GestisciGruppo'}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router