<template>
  <div class="body">
    <div class="header">
      <h1>Benvenuto in SpazzaTN</h1>
      <div class="login-area">
        <button class="button login" v-if="!token" @click="handleLogin">Accedi</button>
        <button class="button profile" v-else @click="handleUserProfile">Profilo personale</button>
        <button class="button register" @click="handleRegister">Registrati</button>
      </div>
    </div>
    <div class="container">
      <router-view></router-view> <!-- Componente visualizzato dinamicamente in base alla rotta -->
    </div>
    <div class="map">
      <MapWindow />
    </div>
  </div>
</template>
  
  <script>
  import MapWindow from './MapWindow.vue';
  export default {
    name: 'MainPage',
    components: {
      MapWindow
    },
    data(){
      return{
        token:'',
        email:'',
        clientUrl: import.meta.env.VITE_CLIENT_URL,
        userIsLogged: false
      }
    },
    mounted(){
      this.token = localStorage.getItem('token');
      this.email = localStorage.getItem('email');
    },
    methods: {
      handleLogin() {
        // Navigazione alla pagina di login
        this.$router.push('/login');
      },
      handleRegister() {
        // Navigazione alla pagina di registrazione
        this.$router.push('/register');
      },
      handleUserProfile() {
        // Navigazione al profilo utente
        this.$router.push('/UserProfile');
      }
    }
  }
  </script>
  
  
  <style scoped>
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    width: 99%;
    display: flex;
    justify-content: center;
    background-color: #222;
    color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
  }

  .container {
    width: 100%; /* Larghezza al 100% dello schermo */
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

  .map {
    position: relative;
    width: 1000px;
    height: 75%;
    background-color: #222;
    border: 1px solid #333;
    margin: auto;
    display: block;
  }
</style>
  