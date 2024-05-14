<template>
  <div>
    <div class="header">
      <h1>Welcome to SpazzaTN</h1>
    </div>

    <div class="container">
      <div class="menu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Portfolio</a>
        <a href="#">Contact</a>
        <a href="#">Settings</a>
      </div>

      <div class="section login-area">
        <h2>Login</h2>
        <button class="button login" @click="handleLogin">Login</button>
      </div>

      <!-- Include the LoginWindow component -->
      <login-window v-if="showLogin" />

      <div class="section register-area">
        <h2>Register</h2>
        <button class="button register" @click="handleRegister">Register</button>
      </div>

      <register-window v-if="showRegister" />

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


export default {
  components: {
    LoginWindow,
    RegisterWindow
  },
  methods: {
    handleLogin() {
      // Mostra la finestra di login impostando uno stato
      this.showRegister = false;
      this.showLogin = true;
    },
    handleRegister() {
      //alert('Register button clicked!');
      // Chiudi la finestra di login
      this.showLogin = false;
      this.showRegister = true;
    },
    handleContinue() {
      //alert('Continue button clicked!');
      // Chiudi la finestra di login
      this.showLogin = false;
      this.showRegister = false;
    }
  },
  data() {
    return {
      showLogin: false,
      showRegister: false
    };
  }
}
</script>


<style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #111;
    color: #fff;
    margin: 0;
    padding: 0;
  }

  .header {
    background-color: #222;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  }

  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 0 20px;
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
</style>

