<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div>
      <p>Welcome, {{ email }}!</p>
      <!-- Add user profile information here -->

    </div>
    <div class="options">
      <button class="gruppi-button" type="Gruppi" @click="goToGruppi">Gestisci gruppi</button>
      <button class="calendario-button" type="Calendario" @click="goToCalendario">Calendario</button>
    </div>
  </div>
  <div>
    <button class="logout-button" type="logout"  @click="logout">Logout</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
 
  data(){
    return{
      token:'',
      email:''
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
    goToGruppi() {
      this.$router.push('/Gruppi');
    },
    goToCalendario() {
      this.$router.push('/calendar');
    },
    logout() {
      alert('Logged out!');
      localStorage.removeItem('token');
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
}

button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.gruppi-button {
  background-color: #00ff00; /* Cambia questo colore come preferisci */
  color: #000000; /* Cambia questo colore come preferisci */
}

button:hover {
  background-color: #cc0000;
}
</style>
