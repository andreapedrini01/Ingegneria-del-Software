<template>
  <div class="register-window">
    <h2>Crea il tuo profilo</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Nome utente:</label>
        <input v-model="username" type="text" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" placeholder="Password">
      </div>
      <button type="submit">Registrati</button>
    </form>
    <br><button type="back" @click="goBack">Torna indietro</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      username: '',
      email: '',
      password: '',
      clientUrl: import.meta.env.VITE_CLIENT_URL
    };
  },
  methods: {
    async submitForm() {
      try {
        alert('Form submitted');
        const response = await fetch(this.clientUrl +'/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            username: this.username,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // If you expect a JSON response, you can parse it
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('An error occurred while submitting the form:', error);
      }
    },
    goBack() {
      this.$router.push('/');
    }
  },
});
</script>

<style scoped>
.register-window {
  background-color: #333;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto; /* Centra orizzontalmente */
    display: block; /* Assicurati che l'elemento sia un blocco per applicare il margine e la larghezza */
}

.form-group {
  margin-bottom: 15px;
}

label {
  color: #fff;
  display: block;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #00ff00;
  color: #000;
  padding: 10px 20px;
  border: 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #00cc00;
}
</style>
