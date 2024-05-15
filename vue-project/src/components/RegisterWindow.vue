<template>
  <div class="register-window">
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Username:</label>
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
      <button type="submit">Submit</button>
    </form>
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
      password: ''
    };
  },
  methods: {
    async submitForm() {
      //registration logic
      const user = {
        email: this.email,
        password: this.password,
        username: this.username,
      };
      //send POST request
      try {
        const response = await axios.post('http://localhost:8080/register', user);
        console.log(response.data);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  }
});
</script>

<style scoped>
.register-window {
  background-color: #333;
  padding: 20px;
  border-radius: 5px;
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
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #00cc00;
}
</style>
