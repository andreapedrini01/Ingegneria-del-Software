<template>
  <div class="body">
    <div class="header">
      <h1>Pagina utente</h1>
      <div class="Button-Home">
      <button @click="goBack">Home</button>
      </div>
    </div>
    <div class="user-profile">
      <h2>Profilo utente</h2>
      <div>
        <p>Bentornato, {{ email }}!</p>
        <!-- Add user profile information here -->

      </div>
      <div class="options">
        <button class="gruppi-button" type="Gruppi" @click="goToGruppi">Gestisci gruppi</button>
        <button class="calendario-button" type="Calendario" @click="goToCalendario">Calendario</button>
      </div>
    </div>
    <div class="logout">
      <button class="logout-button" type="logout"  @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
 
  data(){
    return{
      token:'',
      email:'',
      clientUrl: import.meta.env.VITE_CLIENT_URL
    }
  },
  mounted(){
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.$router.push('/login');
    }
    this.email = localStorage.getItem('email');
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    goToGruppi() {
      this.$router.push('/Gruppi');
    },
    goToCalendario() {
      this.$router.push('/calendar');
    },
    logout() {
      alert('Logged out!');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.token = '';
      this.$router.push('/');
    }
  }
});
</script>

<style scoped>
.user-profile {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}

button {
  background-color: #00ff00;
  color: #000000;
  padding: 10px 20px;
  border: 2px solid #000;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.gruppi-button {
  background-color: #00ff00; /* Cambia questo colore come preferisci */
  color: #000000; /* Cambia questo colore come preferisci */
}

button:hover {
  background-color: #00cc00;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
}

.home-button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
}

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

  .header .Button-Home {
    color: #000000;
    position: absolute;
    right: 20px;
  }

  .logout {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
