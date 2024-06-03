<!-- LoginWindow.vue -->

<template>
  <div class="login-window">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Enter</button>
    </form>
    <br><button type="back" @click="goBack">Go back</button><button type="back" @click="Forgot">Forgot Password</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // Simuliamo il login corretto (si presume che la validazione sia sempre superata)
      //const loggedInUsername = this.email.split('@')[0]; // Utilizziamo l'email come username
      //this.$emit('login-success', loggedInUsername);
      //this.$router.push('/UserProfile');
    },
    async login() {
      alert('Form submitted ' + this.email);
      console.log('started login ' + this.password)
      try {
        const response = await fetch('http://localhost:8080/api/v1/authentications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
        });

        if (!response.ok) {
          throw new Error('Response not OK');
        }

        const data = await response.json();

        // Salviamo il token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);

        // Navigiamo alla pagina /UserProfile
        alert('Login successful!');
        this.$router.push('/UserProfile');
      } catch (error) {
        console.error('Error:', error);
      }
    },
    goBack() {
      this.$router.push('/');
    },
    Forgot() {
      this.$router.push('/requestNewPwd');
    }
  }
});
</script>
  
  <style scoped>
  .login-window {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    width: 100%; /* Riduci la larghezza al 50% del contenitore padre */
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
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00cc00;
  }
  </style>
  