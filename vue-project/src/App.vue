<template>
  <div>
    <div class="header">
      <h1>Welcome to SpazzaTN</h1>
      <div class="login-area">
        <button class="button login" @click="handleLogin">Login</button>
        <button class="button register" @click="handleRegister">Register</button>
      </div>
    </div>
    <div class="container">
      <div class="menu">
        <RouterLink to="/">Home</RouterLink>
        <a href="#">About</a>
        <a href="#">Portfolio</a>
        <a href="#">Contact</a>
        <a href="#">Settings</a>
      </div>

      <!-- <div class="section login-area">
        <h2>Login</h2>
        <button class="button login" @click="handleLogin">Login</button>
      </div>-->

      <!-- Include the LoginWindow component -->
      <!--<login-window v-if="showLogin" />-->
      <login-window v-if="showLogin" @login-success="handleLoginSuccess" />
      <user-profile v-if="isLoggedIn" :username="loggedInUsername" />

      <!--<div class="section register-area">
        <h2>Register</h2>
        <button class="button register" @click="handleRegister">Register</button>
      </div>-->

      <register-window v-if="showRegister" @register="handleRegister" />

      <div class="section continue-without-account">
        <h2>Continue Without Account</h2>
        <button class="button continue" @click="handleContinue">Continue</button>
      </div>

      <div class="menu">
        <button class="button">Button 1</button>
        <button class="button">Button 2</button>
        <button class="button">Button 3</button>
        <button class="button">Button 4</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginWindow from './components/LoginWindow.vue';
import RegisterWindow from './components/RegisterWindow.vue';
import UserProfile from './components/UserProfile.vue';
import axios from 'axios';
import LoginPage from './components/LoginPage.vue';
import {ref, onMounted} from 'vue';

export default {
  name: 'App',
  components: {
    LoginWindow,
    RegisterWindow,
    UserProfile,
    LoginPage
  },
  methods: {
    handleLogin() {
      //naviga alla pagina di login
      this.$router.push('/login');
      this.showRegister = false;
      this.showLogin = true;
    },
    handleLoginSuccess(username) {
      // Imposta lo stato di accesso e il nome utente dell'utente loggato
      this.isLoggedIn = true;
      this.loggedInUsername = username;
      // Chiudi la finestra di login
      this.showLogin = false;
    },
    handleRegister() {
      this.$router.push('/register');
      this.showLogin = false;
      this.showRegister = true;
    },
    handleContinue() {
      //alert('Continue button clicked!');
      // Chiudi la finestra di login
      this.$router.push('/');
      this.showLogin = false;
      this.showRegister = false;
    }
  },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      email: '',
      password: '',
      username: '',
      isLoggedIn: false,
      loggedInUsername: '' // Memorizza il nome utente dell'utente loggato
    };
  }
}
</script>


<style scoped>
  body {
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #111;
    color: #fff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #222;
    color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
  }

  .container {
    width: 100vw; /* Larghezza al 100% dello schermo */
    padding: 0; /* Rimuovi il padding per far coincidere il bordo con il bordo dello schermo */
    box-sizing: border-box; /* Mantieni il box-sizing */
  }

  .menu {
    text-align: center;
    margin-top: 20px;
  }

  .menu a {
    color: #00ff00;
    text-decoration: none;
    margin: 0 10px;
  }

  .section {
    text-align: center;
    margin-top: 50px;
  }

  .button {
    background-color: #00ff00;
    color: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 20px;
    display: inline-block;
  }

  .button:hover {
    background-color: #00cc00;
  }

  .header .login-area {
    position: absolute;
    right: 20px;
  }
</style>

